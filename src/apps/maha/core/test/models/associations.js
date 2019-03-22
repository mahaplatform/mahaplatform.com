import { expect } from 'chai'

export const test_virtual = (model, key, conditions, value) => async () => {

  const object = await model.where(conditions).fetch()

  expect(object.get(key)).to.equal(value)

}

export const test_has_many = (model, relation) => async () => {

  const object = await model.where({ id: 1 }).fetch({ withRelated: [relation] })

  expect(object.related(relation).relatedData.type).to.equal('hasMany')

}

export const test_belongs_to_many = (model, relation) => async () => {

  const object = await model.where({ id: 1 }).fetch({ withRelated: [relation] })

  expect(object.related(relation).relatedData.type).to.equal('belongsToMany')

}

export const test_belongs_to = (model, relation) => async () => {

  const object = await model.where({ id: 1 }).fetch({ withRelated: [relation] })

  expect(object.related(relation).relatedData.type).to.equal('belongsTo')

}

export const test_has_one = (model, relation, conditions) => async () => {

  const object = await model.where(conditions).fetch({ withRelated: [relation] })

  expect(object.related(relation).relatedData.type).to.equal('hasOne')

}
