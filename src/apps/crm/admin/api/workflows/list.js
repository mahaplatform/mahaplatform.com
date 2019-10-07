const listRoute = async (req, res) => {

  const records = []

  records.pagination = { all: 0, total: 0 }

  res.status(200).respond(records)

}

export default listRoute
