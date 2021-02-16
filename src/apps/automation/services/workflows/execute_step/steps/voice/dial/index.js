import announce from './announce'
import forward from './forward'

const dialStep = async (req, twiml) => {
  const verb = req.query.action === 'forward' ? forward : announce
  return await verb(req, twiml)
}

export default dialStep
