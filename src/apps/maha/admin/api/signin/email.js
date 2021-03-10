import Account from '@apps/maha/models/account'

const emailRoute = async (req, res) => {

  if(!req.body.email) return res.status(422).json({
    code: 422,
    message: 'Please enter your email'
  })

  const account = await Account.where({
    email: req.body.email
  }).fetch({
    withRelated: ['features','photo'],
    transacting: req.trx
  })

  if(!account) return res.status(404).json({
    code: 404,
    message: 'Unable to find this account'
  })

  if(!account.get('activated_at')) return res.status(422).json({
    code: 422,
    message: 'Your account has not been activated'
  })

  await res.status(200).respond({
    account: {
      id: account.get('id'),
      full_name: account.get('full_name'),
      initials: account.get('initials'),
      email: account.get('email'),
      photo: account.related('photo') ? account.related('photo').get('path') : null,
      authentication_strategy: account.get('authentication_strategy'),
      features: account.related('features').map(feature => feature.get('title')),
      use_twofactor: account.get('use_twofactor'),
      is_blocked: account.get('is_blocked'),
      locked_out_at: account.get('locked_out_at')
    }
  })

}

export default emailRoute
