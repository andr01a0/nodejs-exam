/** @type {import('./__types/[id]').RequestHandler} */

export async function GET({params}) {
  // `params.id` comes from [id].js
  const userProfileId = params.id

  if (userProfileId) {
    return {
      status: 200,
      headers: {},
      body: { userProfileId }
    }
  }
  return {
    status: 404
  }
}