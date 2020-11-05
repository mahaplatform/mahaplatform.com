import { whitelist } from '@core/services/routes/params'
import Responsibility from '../models/responsibility'
import _ from 'lodash'

export const updateResponsibilities = async (req, appraisal, params) => {

  const delete_ids = appraisal.related('responsibilities').map(responsibility => {
    return responsibility.get('id')
  }).filter(id => {
    return _.find(req.body.responsibilities, { id }) === undefined
  })

  if(delete_ids) {
    await req.trx('appraisals_responsibilities').whereIn('id', delete_ids).del()
  }

  if(req.body.responsibilities) {

    await Promise.mapSeries(req.body.responsibilities, async (data) => {

      if(!data.id) {
        return await Responsibility.forge({
          team_id: req.team.get('id'),
          appraisal_id: appraisal.get('id'),
          ...whitelist(data, ['responsibility_type_id','weight','rating','comments'])
        }).save(null, {
          transacting: req.trx
        })
      }

      const responsibility  = await Responsibility.query(qb => {
        qb.where('team_id', req.team.get('id'))
        qb.where('id', data.id)
      }).fetch({
        transacting: req.trx
      })

      await responsibility.save({
        ...whitelist(data, ['responsibility_type_id','weight','rating','comments'])
      }, {
        patch: true,
        transacting: req.trx
      })

    })

  }

}
