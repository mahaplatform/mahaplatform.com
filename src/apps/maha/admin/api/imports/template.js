const templateRoute = async (req, res) => {

  await res.status(200).respond(req.query.columns.reduce((template, column) => ({
    ...template,
    [column]: ''
  }), {}))

}

export default templateRoute
