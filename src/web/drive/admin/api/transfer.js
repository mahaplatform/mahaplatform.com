import { Route, knex } from 'maha'

const processor = async (req, trx, options) => {

  const accesses = await knex('drive_access').transacting(trx)
    .where('user_id', req.body.from_user_id)
    .where('access_type_id', 1)

  const codes = accesses.map(access => access.code)

  const access_ids = accesses.map(access => access.id)

  await knex('drive_access').transacting(trx).whereIn('code', codes).where({
    user_id: req.body.to_user_id
  }).delete()

  await knex('drive_access').transacting(trx).whereIn('id', access_ids).update({
    user_id: req.body.to_user_id
  })

  if(req.body.strategy === 'none') return

  await knex('drive_access').transacting(trx).insert(accesses.map(access => ({
    team_id: access.team_id,
    code: access.code,
    is_everyone: false,
    group_id: null,
    user_id: req.body.from_user_id,
    access_type_id: req.body.strategy === 'edit' ? 2 : 3
  })))

  return true

}

const trashRoute = new Route({
  method: 'post',
  path: '/transfer',
  processor,
  rules: {
    from_user_id: ['required'],
    to_user_id: ['required'],
    strategy: ['required']
  }
})

export default trashRoute
