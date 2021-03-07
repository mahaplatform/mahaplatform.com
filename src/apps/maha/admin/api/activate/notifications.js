import { getAccountToken } from '@apps/maha/services/accounts'
import { activity } from '@core/services/routes/activities'
import { validate } from '@core/utils/validation'
import moment from 'moment'

const notificationsRoute = async (req, res) => {

  await validate({
    token: 'required',
    email_notifications_method: 'required'
  }, req.body)

  await req.account.save({
    activated_at: moment(),
    is_blocked: false
  }, {
    patch: true,
    transacting: req.trx
  })

  await req.user.save({
    email_notifications_method: req.body.email_notifications_method,
    activated_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'activated {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'account',
    object_type: null
  })

  res.status(200).respond({
    account: {
      id: req.account.get('id'),
      first_name: req.account.get('first_name'),
      last_name: req.account.get('last_name'),
      full_name: req.account.get('full_name'),
      initials: req.account.get('initials'),
      email: req.account.get('email'),
      photo: req.account.related('photo') ? req.account.related('photo').get('path') : null,
      token: getAccountToken(req, {
        account_id: req.account
      })
    }
  })

}

export default notificationsRoute
