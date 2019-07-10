import Supervisor from '../../maha/models/supervisor'

const isSupervisor = async (req) => {

  const supervisor = await Supervisor.where({
    team_id: req.team.get('id'),
    user_id: req.user.get('id')
  }).fetch({
    transacting: req.trx
  })

  return supervisor !== null

}

const navigation = async (req) => ({
  items: [
    { label: 'Assignments', route: '/assignments' },
    { label: 'Report', route: '/assignments/report' },
    { label: 'Trainings', route: '/trainings' }
  ]
})

export default navigation
