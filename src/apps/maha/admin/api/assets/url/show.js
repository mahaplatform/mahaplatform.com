import request from 'request-promise'
import path from 'path'
import Url from 'url'

const urlRoute = async (req, res) => {

  try {

    const response = await request.head(req.query.url).promise()

    const parsed = Url.parse(req.query.url)

    res.status(200).respond({
      ...response,
      file_name: path.basename(parsed.pathname)
    })

  } catch(e) {

    res.status(404).respond({
      message: 'Unable to load url'
    })

  }

}

export default urlRoute
