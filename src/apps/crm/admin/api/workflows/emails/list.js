import Workflow from '../../../../models/workflow'

const listRoute = async (req, res) => {

  const workflow = await Workflow.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', req.params.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const data = [
    { code: 'abcdef', title: 'Email #1' },
    { code: 'abcdef', title: 'Email #2' },
    { code: 'abcdef', title: 'Email #3' }
  ]

  res.status(200).respond(data)

}

export default listRoute
