import  Rollbar from 'rollbar'

const rollbarCreator = (env) => {

  if(env === 'production') {

    return new Rollbar({
      accessToken: process.env.ROLLBAR_SERVER_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: 'server'
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

const rollbar = rollbarCreator(process.env.NODE_ENV)

export default rollbar
