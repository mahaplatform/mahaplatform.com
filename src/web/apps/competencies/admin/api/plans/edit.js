import Plan from '../../../models/plan'

const editRoute = async (req, res) => {

  const plan = await Plan.scope({
    team: req.team
  }).query(qb => {
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
      remind_me_week: plan.get('remind_me_week'),
      remind_me_day: plan.get('remind_me_day')
    }
  }))

}

export default editRoute
