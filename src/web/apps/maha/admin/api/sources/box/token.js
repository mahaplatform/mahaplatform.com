import Box from 'box-node-sdk'

const box = new Box({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
})

const token = async (req, res, next) => {

  const data = await new Promise((resolve, reject) => {

    box.getTokensAuthorizationCodeGrant(req.query.code, null, (err, token) => {

      if(err) reject(err)

      resolve(token)

    })

  })

  return data

}

export default token
