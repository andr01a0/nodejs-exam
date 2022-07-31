import { Strategy as JwtStrategy } from "passport-jwt"
import fs from "fs"
import path from "path"
import User from "../models/user.model.js"
import {fileURLToPath} from 'url'
import { parse } from "cookie"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pathToKey = path.join(__dirname, '../..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const cookieJWTExtractor = function(req) {
  let token = null
  if (req && req.cookies) token = req.cookies['jwt']
  else if(req.headers.cookie) token = parse(req.headers.cookie)['jwt']
  return token
}

const options = {
  jwtFromRequest: cookieJWTExtractor,
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}

export default (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne(jwt_payload.sub)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))
}