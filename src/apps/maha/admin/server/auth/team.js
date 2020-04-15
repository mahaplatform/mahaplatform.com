import Team from '../../../models/team'

const team = async (req, res, next) => {

  const state = req.query.state || req.body.RelayState

  if(!state) throw new Error({
    code: 500,
    message: 'unable to load state'
  })

  const decoded = JSON.parse(Buffer.from(state, 'base64'))

  req.signin_id = decoded.signin_id

  req.team_id = decoded.team_id

  req.team = await Team.query(qb => {
    qb.where('id', req.team_id)
  }).fetch({
    transacting: req.trx
  })

  next()

}

export default team
