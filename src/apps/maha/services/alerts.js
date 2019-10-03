import mailer from '../queues/mailer_queue'
import Alert from '../models/alert'
import App from '../models/app'

export const sendAlert = async (req, user, code, data) => {

  const alert_id = await getAlertType(req, code)

  const exclusion = await req.trx('maha_users_alerts').where({
    user_id: user.get('id'),
    alert_id
  }).count('* as excluded')

  if(exclusion[0].excluded !== '0') return

  await mailer.enqueue(req, {
    team_id: user.get('team_id'),
    user,
    template: code,
    data
  })

}

const getAlertType = async(req, namespaced) => {

  const [appCode, code] = namespaced.split(':')

  const app = await App.query(qb => {
    qb.where('code', appCode)
  }).fetch({
    transacting: req.trx
  })

  const type = await Alert.query(qb => {
    qb.where({
      app_id: app ? app.get('id') : null,
      code
    })
  }).fetch({
    transacting: req.trx
  })

  return type ? type.id : null

}
