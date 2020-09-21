const updatePhoto = async (req, { account, photo_id }) => {

  await account.save({
    photo_id
  }, {
    transacting: req.trx,
    patch: true
  })

  await account.load(['users'], {
    transacting: req.trx
  })

  await Promise.mapSeries(account.related('users'), async (user) => {
    await user.save({
      photo_id
    }, {
      transacting: req.trx,
      patch: true
    })
  })

}

export default updatePhoto
