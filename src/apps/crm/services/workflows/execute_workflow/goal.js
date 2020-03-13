const goal = async (req, params) => {

  const { enrollment } = params

  await enrollment.save({
    was_converted: true
  }, {
    transacting: req.trx,
    patch: true
  })

  return {}

}

export default goal
