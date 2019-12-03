class RouteError extends Error {

  constructor({ status, message, errors }) {
    super(message)
    this.name = 'RouteError'
    this.status = status
    this.message = message
    this.errors = errors
    Error.captureStackTrace(this, RouteError)
  }

}

export default RouteError
