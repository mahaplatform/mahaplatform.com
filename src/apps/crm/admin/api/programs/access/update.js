import socket from '../../../../../../core/services/routes/emitter'
import Program from '../../../../models/program'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const program = await Program.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.program_id)
  }).fetch({
    transacting: req.trx
  })

  if(!program) return res.status(404).respond({
    code: 404,
    message: 'Unable to load program'
  })

  const current = await req.trx('crm_program_accesses').where({
    program_id: program.get('id')
  })

  await Promise.map(req.body.access, async access => {

    const existing = _.find(current, {
      grouping_id: access.grouping_id,
      group_id: access.group_id,
      user_id: access.user_id
    })

    if(!existing && access.type !== null) {

      await req.trx('crm_program_accesses').insert({
        team_id: program.get('team_id'),
        program_id: program.get('id'),
        grouping_id: access.grouping_id,
        group_id: access.group_id,
        user_id: access.user_id,
        type: access.type
      })

    } else if(existing && existing.type !== access.type) {

      await req.trx('crm_program_accesses').where({
        id: existing.id
      }).update({
        type: access.type
      })

    }

  })

  await Promise.map(current, async access => {

    const existing = _.find(req.body.access, {
      grouping_id: access.grouping_id,
      group_id: access.group_id,
      user_id: access.user_id
    })

    if(existing) return

    await req.trx('crm_program_accesses').where({
      id: access.id
    }).delete()

  })


  await socket.refresh(req, [
    `/admin/crm/programs/${req.params.program_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
