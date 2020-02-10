import Email from '../../../../apps/maha/models/email'

const showRoute = async (req, res) => {

  const email = await Email.query(qb => {
    qb.where('code', req.params.email_code)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).type('text/html').send(email.get('html'))

}

export default showRoute
