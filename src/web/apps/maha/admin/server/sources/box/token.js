import Box from 'box-node-sdk'

const box = new Box({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
})

const token = async (req, res) => {

  return await new Promise((resolve, reject) => {

    box.getTokensAuthorizationCodeGrant(req.query.code, null, (err, token) => {
      if(err) reject(err)
      resolve(token)
    })

  })

}

export default token
