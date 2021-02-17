import request from 'request-promise'

const previewRoute = async (req, res) => {

  try {

    const response = await request.get(req.query.url, {
      resolveWithFullResponse: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
      },
      encoding: null
    }).promise()

    res.status(200).type(response.headers['content-type']).send(response.body)

  } catch(e) {

    console.log(e)

    res.status(404).respond({
      message: 'Unable to load url'
    })

  }

}

export default previewRoute
