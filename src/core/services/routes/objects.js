import collectObjects from '../../utils/collect_objects'

const modelFiles = collectObjects('models/*')

const models = (tableName) => {
  return modelFiles.find(model => {
    return model.default.extend().__super__.tableName === tableName
  })
}

export const objects = async (req, object) => {
  const model = models(object.object_type)
  if(!model) return null
  return await model.default.query(qb => {
    qb.where('id', object.object_id)
  }).fetch({
    transacting: req.trx
  })
}
