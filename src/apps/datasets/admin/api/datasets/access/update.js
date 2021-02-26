import socket from '@core/services/routes/emitter'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const current = await req.trx('datasets_dataset_accesses').where({
    dataset_id: req.params.dataset_id
  })

  await Promise.map(req.body.access, async access => {

    const existing = _.find(current, {
      grouping_id: access.grouping_id,
      group_id: access.group_id,
      user_id: access.user_id
    })

    if(!existing && access.type !== null) {

      await req.trx('datasets_dataset_accesses').insert({
        team_id: req.team.get('id'),
        dataset_id: req.params.dataset_id,
        grouping_id: access.grouping_id,
        group_id: access.group_id,
        user_id: access.user_id,
        type: access.type
      })

    } else if(existing && existing.type !== access.type) {

      await req.trx('datasets_dataset_accesses').where({
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

    await req.trx('datasets_dataset_accesses').where({
      id: access.id
    }).delete()

  })

  await socket.refresh(req, [
    `/admin/crm/datasets/${req.params.program_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
