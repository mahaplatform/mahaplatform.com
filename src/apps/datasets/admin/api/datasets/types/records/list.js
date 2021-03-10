import RecordSerializer from '@apps/datasets/serializers/record_serializer'
import Dataset from '@apps/datasets/models/dataset'
import Record from '@apps/datasets/models/record'
import Type from '@apps/datasets/models/type'
import Field from '@apps/maha/models/field'

const listRoute = async (req, res) => {

  const dataset = await Dataset.query(qb => {
    qb.where('id', req.params.dataset_id)
  }).fetch({
    transacting: req.trx
  })

  if(!dataset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load dataset'
  })

  const type = await Type.query(qb => {
    qb.where('dataset_id', dataset.get('id'))
    qb.where('id', req.params.type_id)
  }).fetch({
    transacting: req.trx
  })

  if(!type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load type'
  })

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'datasets_types')
    qb.where('parent_id', type.get('id'))
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  console.log({
    ...req.fields.reduce((aliases, field) => ({
      ...aliases,
      [field.get('code')]: `maha_version_versions.active_value->'${field.get('code')}'`
    }), {}),
    status: 'maha_version_versions.status'
  })

  const records = await Record.filterFetch({
    scope: (qb) => {
      qb.select('datasets_records.*','maha_version_versions.active_value as values','maha_version_versions.status')
      qb.joinRaw('inner join maha_version_versions on maha_version_versions.versionable_type=\'datasets_records\' and maha_version_versions.versionable_id=datasets_records.id and maha_version_versions.key=\'values\'')
      qb.where('datasets_records.team_id', req.team.get('id'))
      qb.where('datasets_records.type_id', type.get('id'))
      qb.whereNull('deleted_at')
    },
    aliases: {
      ...req.fields.reduce((aliases, field) => ({
        ...aliases,
        [field.get('code')]: `maha_version_versions.active_value->'${field.get('code')}'`
      }), {}),
      status: 'maha_version_versions.status'
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(records, RecordSerializer)

}

export default listRoute
