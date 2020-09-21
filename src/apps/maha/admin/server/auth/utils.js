import { createUserToken } from '../../../../../core/utils/user_tokens'
import Account from '../../../models/account'

export const loadAccountByEmail = async (req, email, done) => {

  const account = await Account.query(qb => {
    qb.where('email', email)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!account) return done(null, false, { message: 'cannot find account' })

  return done(null, account)

}

export const result = (req, res) => async (err, account, info) => {

  console.log('error', err)

  if(!account) return await failure(req, res)

  req.account = account

  await success(req, res)

}

const success = async (req, res) => {

  const account = {
    id: req.account.get('id'),
    full_name: req.account.get('full_name'),
    initials: req.account.get('initials'),
    email: req.account.get('email'),
    photo: req.account.related('photo') ? req.account.related('photo').get('path') : null,
    token: createUserToken(req.account, 'account_id'),
    authentication_strategy: req.account.get('authentication_strategy')
  }

  res.status(200).type('text/html').render('success', { account })

}

const failure = async (req, res) => {

  res.status(500).send('failed')

}
