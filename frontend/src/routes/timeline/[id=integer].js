/** @type {import('./__types/[id]').RequestHandler} */

export async function GET({params}) {
  // `params.id` comes from [id].js
  const userTimelineId = params.id

  if (userTimelineId) {
    return {
      status: 200,
      headers: {},
      body: { userTimelineId }
    }
  }
  return {
    status: 404
  }
}