import { getNext } from '../utils'

const goalStep = async (req, { config, state }) => ({
  converted: true,
  next: getNext(req, { config, state })
})

export default goalStep
