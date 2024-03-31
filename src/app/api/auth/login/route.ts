export async function POST(request: Request) {
  const data = await request.json()
  const sessionToken = data.token

  return Response.json(
    { data },
    {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=${sessionToken}; HttpOnly; Path=/; SameSite=Lax`,
      },
    },
  )
}
