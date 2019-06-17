import { getIndex } from './utils'

const showRoute = async (req, res) => {

  const index = await getIndex()

  const content = await new Promise((resolve, reject) => {
    index.get([req.params.id]).on('data', resolve)
  })

  res.status(200).respond(content)

}

export default showRoute
