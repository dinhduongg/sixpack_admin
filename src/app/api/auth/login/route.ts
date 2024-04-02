export async function POST(request: Request) {
  const data = await request.json()
  const sessionToken = data.token
  const expiredTime = data.expired_time
  const expiresDate = new Date(expiredTime).toUTCString()

  return Response.json(
    { data },
    {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=${sessionToken}; HttpOnly; Path=/; SameSite=Lax; Expires=${expiresDate}`,
      },
    },
  )
}
