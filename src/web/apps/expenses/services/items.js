import _ from 'lodash'

export const completeItem = async (req, { item, required }) => {

  if(item.get('status_id') !== 1) return

  const complete = required.reduce((complete, key) => {
    const value = item.get(key)
    return !complete ? false : (!_.isNil(value) && (!_.isArray(value) || (_.isArray(value) && value.length > 0)))
  }, true)

  if(!complete) return

  await item.save({
    status_id: 2
  }, {
    patch: true,
    transacting: req.trx
  })

}
