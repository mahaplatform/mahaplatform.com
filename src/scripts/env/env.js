import '../../core/services/environment'
import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const env = async (root, environment) => {

  const client = new SecretManagerServiceClient({
    credentials: {
      client_email: process.env.GOOGLE_GSM_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_GSM_PRIVATE_KEY
    }
  })

  const [secrets] = await client.listSecrets({
    parent: `projects/${ process.env.GOOGLE_GSM_PROJECTID }`
  })

  const envvars = await Promise.reduce(secrets, async(envvars, secret) => {

    const [name] = secret.name.match(/([^/]*)$/)

    const [version] = await client.accessSecretVersion({
      name: `${secret.name}/versions/latest`
    })

    return {
      ...envvars,
      [name]: version.payload.data.toString()
    }

  }, {})

  const getValue = (key) => {
    return envvars[key] || ''
  }

  const template = fs.readFileSync(path.join(__dirname, 'env.ejs'), 'utf8')
  const data = ejs.render(template, { getValue })
  fs.writeFileSync(path.join(root,'.env'), data, 'utf8')
  if(process.env.CIRCLE_SHA1) {
    fs.writeFileSync(path.join(root,'REVISION'), process.env.CIRCLE_SHA1, 'utf8')
  }
}

export default env
