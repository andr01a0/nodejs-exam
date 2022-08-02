export async function GET() {

  return {
    headers: { Location: '/feed' },
    status: 302
  }
}