import Rollbar from 'rollbar'

const rollbarCreator = () => {

  if(process.env.NODE_ENV !== 'development') {
    return new Rollbar({
      accessToken: process.env.ROLLBAR_SERVER_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: 'server',
        client: {
          javascript: {
            source_map_enabled: true
          }
        }
      }
    })
  }

  return {
    configure: (config) => {},
    error: console.error,
    info: console.info,
    log: console.log
  }

}

const rollbar = rollbarCreator()

export default rollbar
