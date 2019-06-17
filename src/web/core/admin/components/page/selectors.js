import { createSelector } from 'reselect'
import _ from 'lodash'

const resources = (state, props) => state.resources

const ready = (state, props) => state.ready

export const data = createSelector(
  resources,
  (resources) => Object.keys(resources).reduce((data, prop) => ({
    ...data,
    [prop]: resources[prop].data
  }), null)
)

export const status = createSelector(
  resources,
  ready,
  (resources, ready) => {
    if(ready) return 'loaded'
    if(Object.keys(resources).length === 0) return 'pending'
    const status = Object.keys(resources).reduce((status, prop) => {
      if(status) return status
      if(_.includes(['failure','forbidden','loading','refreshing'], resources[prop].status)) return resources[prop].status
      return null
    }, null)
    return status || 'loaded'
  }
)
