import { Strategy as JwtStrategy } from "passport-jwt"
import fs from "fs"
import path from "path"
import apiController from "../controllers/api.controller.js"
import {fileURLToPath} from 'url'
import { parse } from "cookie"
import { userDTO } from "../dto/user.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pathToKey = path.join(__dirname, '../..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const cookieJWTExtractor = function(req) {
  let token = null
  if (req.cookies.jwt !== undefined) token = req.cookies.jwt
  else if(req.headers.cookie) token = parse(req.headers.cookie)['jwt']
  return token
}

const options = {
  jwtFromRequest: cookieJWTExtractor,
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}

export default (passport) => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await apiController.getUserById(jwt_payload.sub)
      if (user) {
        return done(null, userDTO(user))
      }
      return done(null, false)
    } catch (error) {
      return done(error, false)
    }
  }))
}