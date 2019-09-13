import Instagram from 'instagram-node'

const client = new Instagram.instagram()

client.use({
  client_id: process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
})

export const getClient = async (req, profile) => {

  client.use({
    access_token: profile.get('data').access_token
  })

  return client

}
