import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pathToKey = path.join(__dirname, '../../..', 'id_rsa_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

export default (user) => {
  const _id = user.dataValues.userId

  const expiresIn = '86400000'

  const payload = {
    sub: _id,
    iat: Date.now()
  }

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}