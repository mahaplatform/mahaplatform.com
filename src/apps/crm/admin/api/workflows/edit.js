import Workflow from '../../../models/workflow'

const editRoute = async (req, res) => {

  const workflow = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  res.status(200).respond(workflow, (req, workflow) => ({
    title: workflow.get('title')
  }))

}

export default editRoute
