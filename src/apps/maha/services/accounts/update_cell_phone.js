const updateCellPhone = async (req, { account, cell_phone }) => {

  await account.save({
    cell_phone
  }, {
    transacting: req.trx,
    patch: true
  })

  await account.load(['users'], {
    transacting: req.trx
  })

  await Promise.mapSeries(account.related('users'), async (user) => {
    await user.save({
      cell_phone
    }, {
      transacting: req.trx,
      patch: true
    })
  })

}

export default updateCellPhone
