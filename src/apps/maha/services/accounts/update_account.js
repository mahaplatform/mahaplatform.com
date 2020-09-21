const updateAccount = async (req, { account, first_name, last_name, email }) => {

  await account.save({
    first_name,
    last_name,
    email
  }, {
    transacting: req.trx,
    patch: true
  })

  await account.load(['users'], {
    transacting: req.trx
  })

  await Promise.mapSeries(account.related('users'), async (user) => {
    await user.save({
      first_name,
      last_name,
      email
    }, {
      transacting: req.trx,
      patch: true
    })
  })

}

export default updateAccount
