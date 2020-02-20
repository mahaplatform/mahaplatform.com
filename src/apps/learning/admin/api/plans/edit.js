import Plan from '../../../models/plan'

const editRoute = async (req, res) => {

  const plan = await Plan.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!plan) return res.status(404).respond({
    code: 404,
    message: 'Unable to load plan'
  })

  res.status(200).respond(plan, (req, plan) => ({
    due: plan.get('due'),
    reminders: {
      remind_me_4_weeks: plan.get('remind_me_4_weeks'),
      remind_me_2_weeks: plan.get('remind_me_2_weeks'),
      remind_me_1_week: plan.get('remind_me_1_week')
    }
  }))

}

export default editRoute
