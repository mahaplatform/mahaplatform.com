import Team from './models/team'

const origins = async (req) => {

  const teams = await Team.fetchAll({
    transacting: req.trx
  })

  return teams.map(team => {
    return team.get('origin')
  })
}

export default origins
