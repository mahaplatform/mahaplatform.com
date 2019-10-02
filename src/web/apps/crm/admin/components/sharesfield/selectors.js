import { createSelector } from 'reselect'
import _ from 'lodash'

const services = ['facebook','twitter','forwardtofriend','pinterest','linkedin']

const networks = (state, props) => state.networks || []

export const options = createSelector(
  networks,
  (networks) =>  services.filter(service => {
    return _.find(networks, { service }) === undefined
  })
)
