const templateRoute = async (req, res) => {

  res.status(200).respond(req.query.columns.reduce((template, column) => ({
    ...template,
    [column]: ''
  }), {}))

}

export default templateRoute
