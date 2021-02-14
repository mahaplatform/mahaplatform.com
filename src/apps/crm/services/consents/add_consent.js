import generateCode from '@core/utils/generate_code'
import Consent from '@apps/crm/models/consent'
import { getChannel, getKey } from './utils'
import moment from 'moment'

const getConsent = async (req, { channel, contact, program, type }) => {

  const key = getKey(type)

  const consent = await Consent.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('program_id', program.get('id'))
    qb.where('type', type)
    qb.where(key, channel.get('id'))
  }).fetch({
    transacting: req.trx
  })

  if(consent) return consent

  const code = await generateCode(req, {
    table: 'crm_consents'
  })

  return await await Consent.forge({
    team_id: req.team.get('id'),
    program_id: program.get('id'),
    [key]: channel.get('id'),
    type,
    code
  }).save(null, {
    transacting: req.trx
  })

}

const addConsent = async(req, { contact, program, type, value }) => {

  const channel = await getChannel(req, {
    contact,
    type,
    value
  })

  if(!channel) return {}

  const consent = await getConsent(req, {
    contact,
    program,
    channel,
    type
  })

  await consent.save({
    optedout_at: null,
    optedin_at: moment(),
    optin_reason: null,
    optout_reason: null,
    optout_reason_other: null
  },{
    transacting: req.trx
  })

}

export default addConsent
