import { expect } from 'chai'

export const test_required = (model, field) => async () => {

  try {

    await model.forge({}).save()

  } catch(err) {

    expect(err.errors[field].message).to.equal(`The ${field} is required`)

  }

}

export const test_uniqueness = (model, field) => async () => {

  const original = await model.where({ id: 1 }).fetch()

  try {

    await model.forge({ [field]: original.get(field) }).save()

  } catch(err) {

    expect(err.errors[field].message).to.equal(`The ${field} is already in use`)

  }

}

export const test_currency = (model, field) => async () => {

  try {

    await model.forge({ [field]: 'not a currency' }).save()

  } catch(err) {

    expect(err.errors[field].message).to.equal(`The ${field} must be valid currency`)

  }

}

export const test_datestring = (model, field) => async () => {

  try {

    await model.forge({ [field]: 'not a datestring' }).save()

  } catch(err) {

    expect(err.errors[field].message).to.equal(`The ${field} must be in the format YYYY-MM-DD`)

  }

}
