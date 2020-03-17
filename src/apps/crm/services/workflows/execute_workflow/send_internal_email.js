import { sendMail } from '../../../../../core/services/email'
import User from '../../../../maha/models/user'
import ejs from 'ejs'

const sendInternalEmail = async (req, { config, tokens }) => {

  const user = await User.query(qb => {
    qb.where('id', config.user_id)
  }).fetch({
    transacting: req.trx
  })

  await sendMail({
    from: 'Maha Platform <mailer@mahaplatform.com>',
    to: user ? user.get('email') : config.email,
    subject: ejs.render(config.subject, tokens),
    html: ejs.render(config.body, tokens)
  })

  return {}

}

export default sendInternalEmail
