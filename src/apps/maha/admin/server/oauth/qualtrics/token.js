import request from 'request-promise'

const token = async ({ code }, scope) => {

  const host = process.env.NODE_ENV === 'production' ? process.env.WEB_HOST : process.env.WEB_HOST.replace(process.env.DOMAIN, '127.0.0.1')

  const redirect_uri = `${host}/admin/oauth/qualtrics/token`

  // TODO

}

export default token
