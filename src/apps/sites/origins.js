import Origin from './models/origin'

const origins = async (req) => {

  const origins = await Origin.fetchAll({
    transacting: req.trx
  })

  return origins.map(origin => {
    return origin.get('name')
  })

}

export default origins
