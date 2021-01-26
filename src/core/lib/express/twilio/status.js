const statusRoute = async (req, res) => {

  console.log(req.body)

  res.status(200).respond(true)

}

export default statusRoute
