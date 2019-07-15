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

const navigation = (req, trx) => ({
  items: [
    { label: 'Appraisals', route: '/appraisals' },
    { label: 'Employees', route: '/appraisals/employees', access: isSupervisor },
    { label: 'Reports', route: '/appraisals/report' }
  ]
})

export default navigation
