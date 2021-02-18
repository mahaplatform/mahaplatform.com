import { getNext } from '../utils'

const propertyStep = async (req, { config, contact, state, step }) => {

  const { name, value, overwrite } = step.config

  // await contact.save({
  //   values: {}
  // }, {
  //   transacting: req.trx,
  //   patch: true
  // })

  return {
    action: {
      key: name,
      value
    },
    next: getNext(req, { config, state })
  }
}

export default propertyStep
