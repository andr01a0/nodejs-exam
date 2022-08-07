/** @type {import('@sveltejs/kit').RequestHandler} */

export async function GET() {



  return {
    headers: { Location: '/login' },
    status: 302
  }
}