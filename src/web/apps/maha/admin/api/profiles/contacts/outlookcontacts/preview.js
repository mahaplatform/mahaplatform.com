import request from 'request-promise'

const getPhotoData = async (bearer, id) => {
  try {
    return await request.get(`https://graph.microsoft.com/v1.0/me/contacts/${id}/photo/$value`, {
      auth: { bearer },
      encoding: null
    })
  } catch(e) {
    return null
  }
}

const preview = async (req, profile) => {

  const bearer = profile.get('data').access_token

  return await getPhotoData(bearer, req.params.id)

}

export default preview
