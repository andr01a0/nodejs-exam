/** @type {import('@sveltejs/kit').RequestHandler} */

import { validateToken } from '../lib/functions/validateToken'

export async function GET() {

  const validToken = validateToken()

  const path = validToken ? "/feed" : "/login"

  const status = validToken ? 302 : 401

  return {
    headers: { Location: path },
    status: status
  }
}