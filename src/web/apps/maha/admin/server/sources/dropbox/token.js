import Dropbox from 'dropbox-v2-api'

const dropbox = new Dropbox.authenticate({
  client_id: process.env.DROPBOX_APP_KEY,
  client_secret: process.env.DROPBOX_APP_SECRET,
  redirect_uri: `${process.env.WEB_HOST}/admin/dropbox/token`
})

const token = async (code, scope) => {

  const data = await new Promise((resolve, reject) => {
    dropbox.getToken(code, (err, result, response) => {
      if(err) return reject(err)
      resolve(result)
    })
  })

  const userinfo = await new Promise((resolve, reject) => {
    dropbox({
      resource: 'users/get_current_account'
    }, (err, result, response) => {
      if(err) return reject(err)
      resolve(result)
    })
  })

  return [{
    photo_url: userinfo.profile_photo_url,
    profile_id: userinfo.account_id,
    username: userinfo.email,
    data: {
      access_token: data.access_token
    }
  }]

}

export default token
