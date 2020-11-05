import { createUserToken } from '@core/utils/user_tokens'
import { validate } from '@core/utils/validation'
import { sendAlert } from '@apps/maha/services/alerts'
import Account from '@apps/maha/models/account'
import moment from 'moment'

const lockoutRoute = async (req, res) => {

  await validate({
    email: 'required'
  }, req.body)

  const account = await Account.where({
    email: req.body.email
  }).fetch({
    transacting: req.trx
  })

  if(!account) return res.status(422).json({
    code: 422,
    message: 'Unable to find this account'
  })

  await account.save({
    locked_out_at: moment()
  }, {
    transacting: req.trx
  })

  const token = createUserToken(account, 'reset_id')

  await sendAlert(req, account, 'maha:lockout', {
    first_name: account.get('first_name'),
    reset_url: `${process.env.WEB_HOST}/reset/${token}`
  })

  res.status(200).respond(true)

}

export default lockoutRoute
