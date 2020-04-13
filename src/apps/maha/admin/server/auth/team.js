import Team from '../../../models/team'

const team = async (req, res, next) => {

  if(!req.query.state) throw new Error({
    code: 500,
    message: 'unable to load state'
  })

  const state = JSON.parse(Buffer.from(req.query.state, 'base64'))

  req.signin_id = state.signin_id

  req.team_id = state.team_id

  req.team = await Team.query(qb => {
    qb.where('id', state.team_id)
  }).fetch({
    transacting: req.trx
  })

  next()

}

export default team
