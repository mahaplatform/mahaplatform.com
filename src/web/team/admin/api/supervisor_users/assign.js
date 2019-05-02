import { Route } from 'maha'

const processor = async (req, trx, options) => {

  const supervisor = await options.knex('maha_supervisors').transacting(trx).where({
    id: req.params.supervisor_id
  })

  await options.knex('maha_supervisions').transacting(trx).where({
    supervisor_id: supervisor[0].user_id
  }).delete()

  await Promise.map(req.body.assignments, async assignment => {

    await options.knex('maha_supervisions').transacting(trx).insert({
      employee_id: assignment.user_id,
      supervisor_id: supervisor[0].user_id
    })

  })

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/team/supervisors/${req.params.supervisor_id}`
]

const assignRoute = new Route({
  method: 'patch',
  path: '',
  processor,
  refresh
})

export default assignRoute
