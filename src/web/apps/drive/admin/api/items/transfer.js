import knex from '../../../../../core/services/knex'
import Checkit from 'checkit'

const transferRoute = async (req, res) => {

  await Checkit({
    from_user_id: ['required'],
    to_user_id: ['required'],
    strategy: ['required']
  }).run(req.body)

  await knex('drive_folders').transacting(req.trx)
    .where('owner_id', req.body.from_user_id)
    .update({
      owner_id: req.body.to_user_id
    })

  await knex('drive_metafiles').transacting(req.trx)
    .where('owner_id', req.body.from_user_id)
    .update({
      owner_id: req.body.to_user_id
    })

  await knex('drive_files').transacting(req.trx)
    .where('owner_id', req.body.from_user_id)
    .update({
      owner_id: req.body.to_user_id
    })

  const accesses = await knex('drive_access').transacting(req.trx)
    .where('user_id', req.body.from_user_id)
    .where('access_type_id', 1)

  const codes = accesses.map(access => access.code)

  const access_ids = accesses.map(access => access.id)

  await knex('drive_access').transacting(req.trx).whereIn('code', codes).where({
    user_id: req.body.to_user_id
  }).delete()

  await knex('drive_access').transacting(req.trx).whereIn('id', access_ids).update({
    user_id: req.body.to_user_id
  })

  if(req.body.strategy === 'none') res.status(200).respond(true)

  await knex('drive_access').transacting(req.trx).insert(accesses.map(access => ({
    team_id: access.team_id,
    code: access.code,
    is_everyone: false,
    group_id: null,
    user_id: req.body.from_user_id,
    access_type_id: req.body.strategy === 'edit' ? 2 : 3
  })))

  res.status(200).respond(true)

}

export default transferRoute
