import request from 'request-promise'
import _ from 'lodash'

const fetchReleases = async () => {
  return await request.get({
    uri: 'https://api.github.com/repos/mahaplatform/mahaplatform.com/releases?per_page=50',
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
  }).promise()
}

const listRoute = async (req, res) => {

  const changes = await fetchReleases()

  const tags = await fetchTags()

  res.status(200).respond(changes, (req, change) => {
    const tag = _.findIndex(tags, { name: change.tag_name })
    return {
      name: change.tag_name,
      body: change.body,
      diff: [
        tags[tag].commit.sha.substr(0,7),
        tags[tag+1].commit.sha.substr(0,7)
      ],
      sha: tags[tag].commit.sha,
      created_at: change.created_at
    }
  })

}

export default listRoute
