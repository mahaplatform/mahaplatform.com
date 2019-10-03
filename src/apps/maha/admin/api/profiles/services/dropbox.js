import Dropbox from 'dropbox-v2-api'

export const getClient = async (req, profile) => {

  const client = new Dropbox.authenticate({
    token: profile.get('data').access_token
  })

  return Promise.promisify(client)

}
