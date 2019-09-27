import request from 'request-promise'

const previewRoute = async (req, res) => {

  try {

    const response = await request.get(req.query.url, {
      resolveWithFullResponse: true,
      encoding: null
    })

    res.status(200).type(response.headers['content-type']).send(response.body)

  } catch(e) {

    console.log(e)

    res.status(404).respond({
      message: 'Unable to load url'
    })

  }

}

export default previewRoute
