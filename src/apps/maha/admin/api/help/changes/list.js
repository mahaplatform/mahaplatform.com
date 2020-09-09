import request from 'request-promise'

const fetchReleases = async () => {
  return await request.get({
    uri: 'https://api.github.com/repos/mahaplatform/mahaplatform.com/releases?per_page=100',
    encoding: null,
    headers: {
      'User-Agent': 'the Maha Platform'
    },
    json: true
  }).promise()
}

const fetchTags = async () => {
  return await request.get({
    uri: 'https://api.github.com/repos/mahaplatform/mahaplatform.com/tags?per_page=100',
    encoding: null,
    headers: {
      'User-Agent': 'the Maha Platform'
    },
    json: true
  }).promise().then(tags => tags.reduce((tags, tag) => ({
    ...tags,
    [tag.name]: tag.commit.sha
  }), {}))
}

const listRoute = async (req, res) => {

  const changes = await fetchReleases()

  const tags = await fetchTags()

  res.status(200).respond(changes, (req, change) => ({
    name: change.name,
    body: change.body,
    sha: tags[change.name],
    created_at: change.created_at
  }))

}

export default listRoute
