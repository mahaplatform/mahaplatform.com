import collectObjects from '../../../../../core/utils/collect_objects'

let mapped = null

const models = (table) => {

  if(mapped) return mapped[table]

  mapped = collectObjects('models/*').reduce((objects, model) => {

    const object = model.default

    return {
      ...objects,
      [object.extend().__super__.tableName]: object
    }

  }, {})

  return mapped[table]

}

export default models
