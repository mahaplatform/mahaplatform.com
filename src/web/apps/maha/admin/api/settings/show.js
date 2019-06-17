const showRoute = async (req, res) => {

  if(!req.apps[req.params.code]) return res.status(404).respond({
    code: 404,
    message: 'Unable to find app'
  })

  const app = req.apps[req.params.code]

  res.status(200).respond({
    settings: app ? app.settings : {}
  })

}

export default showRoute
