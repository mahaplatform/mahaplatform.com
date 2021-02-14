import Consent from '@apps/crm/models/consent'
import { getChannel, getKey } from './utils'
import moment from 'moment'

const removeConsent = async(req, { contact, program, type, value }) => {

  const key = getKey(type)

  const channel = await getChannel(req, {
    contact,
    type,
    value
  })

  if(!channel) return {}

  const consent = await Consent.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', program.get('id'))
    qb.where('type', type)
    qb.where(key, channel.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(!consent) return

  await consent.save({
    optedout_at: moment()
  }, {
    transacting: req.trx,
    patch: true
  })

}

export default removeConsent
