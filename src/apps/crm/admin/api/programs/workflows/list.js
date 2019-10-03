const listRoute = async (req, res) => {

  res.status(200).respond({ data: [], pagination: { all: 0, total: 0 } })

}

export default listRoute
