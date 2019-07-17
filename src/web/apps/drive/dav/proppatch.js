import response from './response.xml'

const route = async (req, res) => {

  const props = req.body['D:propertyupdate']['D:set'][0]['D:prop'][0]

  const data = response(req, req.item, props)

  res.status(207).type('application/xml').send(data)

}

export default route
