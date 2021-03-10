import states from './states'
import _ from 'lodash'

const countiesRoute = async (req, res) => {

  const state = _.find(states, {
    short_name: req.params.state.toUpperCase()
  })

  if(!state) return res.status(404).respond({
    code: 404,
    message: 'Unable to load state'
  })

  const counties = state.counties

  counties.pagination = {
    all: counties.length,
    total: counties.length,
    skip: 0,
    limit: 1000
  }

  await res.status(200).respond(counties)

}

export default countiesRoute
