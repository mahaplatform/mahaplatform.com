const listRoute = async (req, res) => {

  const data = []

  data.pagination = { all: 0, total: 0 }

  res.status(200).respond(data)

}

export default listRoute
