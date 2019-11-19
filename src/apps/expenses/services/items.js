import _ from 'lodash'

export const completeItem = async (req, { item, required }) => {

  if(item.get('status') !== 'incomplete') return

  const complete = required.reduce((complete, key) => {
    const value = item.get(key)
    if(!complete) return false
    if(_.isArray(value) && value.length > 0) return true
    return !_.isNil(value) && !_.isArray(value)
  }, true)

  if(!complete) return

  await item.save({
    status: 'pending'
  }, {
    patch: true,
    transacting: req.trx
  })

}
