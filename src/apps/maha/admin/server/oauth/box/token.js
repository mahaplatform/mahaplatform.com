import Box from 'box-node-sdk'

const box = new Box({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
})

const token = async ({ code }, scope) => {

  const data = await box.getTokensAuthorizationCodeGrant(code)

  const client = box.getBasicClient(data.accessToken)

  const userinfo = await client.users.get(client.CURRENT_USER_ID)

  return [{
    photo_url: userinfo.avatar_url,
    profile_id: userinfo.id,
    username: userinfo.login,
    data
  }]

}

export default token
