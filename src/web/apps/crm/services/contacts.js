import _ from 'lodash'

export const getChanges = (req, { contact }) => {

  const { _previousAttributes, attributes } = contact

  const changes = Object.keys(_previousAttributes).filter(key => {
    return !_.includes(['updated_at','created_at','values'], key)
  }).reduce((changes, key) => {
    if(_.isEqual(attributes[key], _previousAttributes[key])) return changes
    return [
      ...changes,
      { action: 'changed', field: key, was: _previousAttributes[key], value: attributes[key] }
    ]
  }, [])

  return changes

}
