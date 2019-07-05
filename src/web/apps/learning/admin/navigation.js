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
    { label: 'Appraisals', items: [] },
    { label: 'Competencies', items: [
      { label: 'Configuration', rights: ['competencies:manage_configuration'], items: [
        { label: 'Categories', route: '/categories' },
        { label: 'Classifications', route: '/classifications' },
        { label: 'Competencies', route: '/competencies' },
        { label: 'Resources', route: '/resources' }
      ] },
      { label: 'Employees', route: '/plans/employees', access: isSupervisor },
      { label: 'Plans', rights: ['competencies:manage_plans'], route: '/plans' },
      { label: 'Report', rights: ['competencies:manage_configuration'], route: '/plans/report' },
      { label: 'Resources', route: '/resources/search' }
    ] },
    { label: 'Trainings', items: [
      { label: 'Assignments', route: '/assignments' },
<<<<<<< HEAD
      { label: 'Report', route: '/assignments/report' },
=======
>>>>>>> working through training management
      { label: 'Trainings', route: '/trainings' }
    ] }
  ]
})

export default navigation
