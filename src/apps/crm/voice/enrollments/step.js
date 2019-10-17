import Enrollment from '../../models/enrollment'
import Action from '../../models/action'
import Step from '../../models/step'
import { twiml } from 'twilio'

const stepRoute = async (req, res) => {

  const enrollment = await Enrollment.query(qb => {
    qb.where('code', req.params.enrollment_id)
  }).fetch({
    transacting: req.trx
  })

  const step = await Step.query(qb => {
    qb.where('workflow_id', enrollment.get('workflow_id'))
    qb.where('code', req.params.step_id)
  }).fetch({
    transacting: req.trx
  })

  await Action.forge({
    team_id: enrollment.get('team_id'),
    enrollment_id: enrollment.get('id'),
    step_id: step.get('id')
  }).save(null, {
    transacting: req.trx
  })

  const config = step.get('config')

  const response = new twiml.VoiceResponse()

  response.say({
    voice: config.voice
  }, config.message)

  res.status(200).type('text/xml').send(response.toString())

}

export default stepRoute
