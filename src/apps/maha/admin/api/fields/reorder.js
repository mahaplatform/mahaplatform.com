import socket from '@core/services/routes/emitter'

const reorderRoute = async (req, res) => {

  const fields = await req.trx('maha_fields')
    .where('parent_type', req.params.parent_type)
    .where(qb => {
      if(req.params.parent_id) {
        qb.where('parent_id', req.params.parent_id)
      }
    })
    .orderBy('delta', 'asc')

  await Promise.map(fields, async (field) => {

    const from = parseInt(req.body.from)

    const to = parseInt(req.body.to)

    if(from < to && field.delta > from && field.delta <= to) {

      await req.trx('maha_fields')
        .where('id', field.id)
        .update({
          delta: field.delta - 1
        })

    } else if(from > to && field.delta < from && field.delta >= to) {

      await req.trx('maha_fields')
        .where('id', field.id)
        .update({
          delta: field.delta + 1
        })

    } else if(field.delta === from) {

      await req.trx('maha_fields')
        .where('id', field.id)
        .update({
          delta: to
        })

    }

  })

  await socket.refresh(req, {
    channel: req.params.parent_id ? `/admin/${req.params.parent_type}/${req.params.parent_id}/fields` : `/admin/${req.params.parent_type}/fields`
  })

  await res.status(200).respond(true)

}

export default reorderRoute
