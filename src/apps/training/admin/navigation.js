import Supervisor from '@apps/maha/models/supervisor'

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
    { label: 'Administration', rights: ['training:manage_trainings'], items: [
      { label: 'Assignings', route: '/assignings' },
      { label: 'Assignments', route: '/assignments/report' },
      { label: 'Offerings', route: '/offerings' },
      { label: 'Trainings', route: '/trainings' }
    ] },
    { label: 'Assignments', route: '/assignments' },
    { label: 'Employees', route: '/assignments/employees', access: isSupervisor }
  ]
})

export default navigation
