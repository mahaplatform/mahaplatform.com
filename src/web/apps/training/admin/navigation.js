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
    { label: 'Administration', rights: [], items: [
      { label: 'Assignings', route: '/assignings' },
      { label: 'Offerings', route: '/offerings' },
      { label: 'Trainings', route: '/trainings' }
    ] },
    { label: 'Employees', route: '/assignments/employees', access: isSupervisor },
    { label: 'Report', route: '/assignments/report' },
    { label: 'Trainings', route: '/assignments' }
  ]
})

export default navigation
