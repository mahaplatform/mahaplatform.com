import Origin from './models/origin'

const origins = async () => {

  const origins = await Origin.fetchAll()

  return origins.reduce((origins, origin) => [
    ...origins,
    origin.get('name')
  ], [])

}

export default origins
