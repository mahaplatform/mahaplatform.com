import TypeSerializer from '@apps/datasets/serializers/type_serializer'
import { activity } from '@core/services/routes/activities'
import { createField } from '@apps/maha/services/fields'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Dataset from '@apps/datasets/models/dataset'
import Type from '@apps/datasets/models/type'

const createRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.dataset_id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  const code = await generateCode(req, {
    table: 'datasets_types'
  })

  const type = await Type.forge({
    team_id: req.team.get('id'),
    dataset_id: dataset.get('id'),
    code,
    title: req.body.title
  }).save(null, {
    transacting: req.trx
  })

  await createField(req, {
    parent_type: 'datasets_types',
    parent_id: type.get('id'),
    name: {
      value: 'Title',
      token: 'title'
    },
    type: 'textfield',
    config: {
      label: 'Title',
      instructions: '',
      required: true
    },
    is_mutable: true
  })

  await audit(req, {
    story: 'created',
    auditable: type
  })

  await activity(req, {
    story: 'created {object}',
    object: type
  })

  await socket.refresh(req, [
    '/admin/datasets/datasets'
  ])

  res.status(200).respond(type, TypeSerializer)

}

export default createRoute
