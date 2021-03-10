import request from 'request-promise'
import path from 'path'
import Url from 'url'

const urlRoute = async (req, res) => {

  try {

    const response = await request.get(req.query.url, {
      resolveWithFullResponse: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
      },
      encoding: null
    }).promise()

    const parsed = Url.parse(req.query.url)

    await res.status(200).respond({
      ...response.headers,
      file_name: path.basename(parsed.pathname)
    })

  } catch(e) {

    console.log(e)

    res.status(404).respond({
      message: 'Unable to load url'
    })

  }

}

export default urlRoute
