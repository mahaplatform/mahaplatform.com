import states from './states'

const listRoute = async (req, res) => {

  states.pagination = {
    all: states.length,
    total: states.length,
    skip: 0,
    limit: 1000
  }

  await res.status(200).respond(states, (req, state) => ({
    short_name: state.short_name,
    full_name: state.full_name
  }))

}

export default listRoute
