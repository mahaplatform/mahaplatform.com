import mailer from '../queues/mailer_queue'
import knex from '../../../core/services/knex'
import Alert from '../models/alert'
import App from '../models/app'

export const sendAlert = async (req, trx, user, code, data) => {

  const alert_id = await getAlertType(code, trx)

  const exclusion = await knex('maha_users_alerts').transacting(trx).count('* as excluded').where({
    user_id: user.get('id'),
    alert_id
  })

  if(exclusion[0].excluded !== '0') return

  await mailer.enqueue(req, trx, {
    team_id: user.get('team_id'),
    user,
    template: code,
    data
  })

}

const getAlertType = async(namespaced, trx) => {

  const [appCode, code] = namespaced.split(':')

  const app = await App.where('code', appCode).fetch({ transacting: trx })

  const type = await Alert.where({
    app_id: app ? app.get('id') : null,
    code
  }).fetch({ transacting: trx })

  return type ? type.id : null

}
