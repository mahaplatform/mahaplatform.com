import { validate } from '../../../../../core/utils/validation'

const transferRoute = async (req, res) => {

  await validate({
    from_user_id: ['required'],
    to_user_id: ['required'],
    strategy: ['required']
  }, req.body)

  await req.trx('drive_folders')
    .where('owner_id', req.body.from_user_id)
    .update({
      owner_id: req.body.to_user_id
    })

  await req.trx('drive_metafiles')
    .where('owner_id', req.body.from_user_id)
    .update({
      owner_id: req.body.to_user_id
    })

  await req.trx('drive_files')
    .where('owner_id', req.body.from_user_id)
    .update({
      owner_id: req.body.to_user_id
    })

  const accesses = await req.trx('drive_access')
    .where('user_id', req.body.from_user_id)
    .where('access_type_id', 1)

  const codes = accesses.map(access => access.code)

  const access_ids = accesses.map(access => access.id)

  await req.trx('drive_access').whereIn('code', codes).where({
    user_id: req.body.to_user_id
  }).delete()

  await req.trx('drive_access').whereIn('id', access_ids).update({
    user_id: req.body.to_user_id
  })

  if(req.body.strategy === 'none') res.status(200).respond(true)

  await req.trx('drive_access').insert(accesses.map(access => ({
    team_id: access.team_id,
    code: access.code,
    grouping: '',
    group_id: null,
    user_id: req.body.from_user_id,
    access_type_id: req.body.strategy === 'edit' ? 2 : 3
  })))

  res.status(200).respond(true)

}

export default transferRoute
