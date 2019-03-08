import { Navigation, Supervisor } from 'maha'

const isSupervisor = async (req, trx) => {

  const supervisor = await Supervisor.where({
    team_id: req.team.get('id'),
    user_id: req.user.get('id')
  }).fetch({ transacting: trx })

  return supervisor !== null

}

const navigation = new Navigation(async (req, trx) => ({
  items: [
    { label: 'Configuration', rights: ['competencies:manage_configuration'], items: [
      { label: 'Categories', route: '/categories' },
      { label: 'Classifications', route: '/classifications' },
      { label: 'Competencies', route: '/competencies' },
      { label: 'Resources', route: '/resources' }
    ] },
    { label: 'Employees', route: '/employees', access: isSupervisor },
    { label: 'Plans', rights: ['competencies:manage_plans'], route: '/plans' },
    { label: 'Resources', route: '/resources/search' }
  ]
}))

export default navigation
