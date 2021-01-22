import request from 'request-promise'

const fetchReleases = async () => {
  return await request.get({
    uri: 'https://api.github.com/repos/mahaplatform/mahaplatform.com/releases?per_page=20',
    encoding: null,
    headers: {
      'User-Agent': 'the Maha Platform'
    },
    json: true
  }).promise()
}

const listRoute = async (req, res) => {

  const changes = await fetchReleases()

  res.status(200).respond(changes, (req, change) => {
    return {
      name: change.tag_name,
      body: change.body,
      created_at: change.created_at
    }
  })

}

export default listRoute
