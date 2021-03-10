import request from 'request-promise'

const lookupRoute = async (req, res) => {

  const response = await request({
    method: 'GET',
    uri: 'https://www.routingnumbers.info/api/data.json',
    qs: {
      rn: req.query.number
    },
    json: true
  })

  if(response.code === 404) return res.status(404).respond({
    code: 404,
    message: 'Unable to lookup bank'
  })

  await res.status(200).respond(response)

}

export default lookupRoute
