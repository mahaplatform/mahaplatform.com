const route = async (req, res) => {

  await req.item.save({
    locked_at: null,
    locked_by_id: null
  }, {
    patch: true
  })

  res.status(204).send()

}

export default route
