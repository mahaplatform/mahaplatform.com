const faviconRoute = async (req, res) => {

  return res.status(404).respond({
    code: 404,
    message: 'Unable to load favicon'
  })

}

export default faviconRoute
