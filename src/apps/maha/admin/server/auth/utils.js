import { createUserToken } from '@core/utils/user_tokens'
import Account from '@apps/maha/models/account'

export const loadAccountByEmail = async (req, email, done) => {

  const account = await Account.query(qb => {
    qb.where('email', email)
  }).fetch({
    withRelated: ['features','photo'],
    transacting: req.trx
  })

  if(!account) return done(null, false, { message: 'cannot find account' })

  return done(null, account)

}

export const result = (req, res) => async (err, account, info) => {

  if(!account) return await failure(req, res)

  req.account = account

  await success(req, res)

}

const success = async (req, res) => {

  const account =

  res.status(200).type('text/html').render('success', {
    token: createUserToken(req.account, 'account_id')
  })

}

const failure = async (req, res) => {

  res.status(500).send('failed')

}
