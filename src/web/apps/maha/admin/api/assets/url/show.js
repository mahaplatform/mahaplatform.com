import request from 'request-promise'

const urlRoute = async (req, res) => {

  try {

    const response = await request.head(req.query.url).promise()

    res.status(200).respond(response)

  } catch(e) {

    res.status(404).respond({
      message: 'Unable to load url'
    })

  }

}

export default urlRoute
