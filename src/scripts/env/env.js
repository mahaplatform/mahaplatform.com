import '../../core/services/environment'
import aws from 'aws-sdk'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

aws.config.constructor({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || ''
})

const env = async (root, environment) => {

  const client = new aws.SecretsManager({
    region: process.env.AWS_REGION
  })

  const secret = await client.getSecretValue({
    SecretId: process.env.NODE_ENV
  }).promise()

  const envvars = JSON.parse(secret.SecretString)

  const getValue = (key) => {
    return envvars[key] ? envvars[key].replace(/\n/g, '\\n') : ''
  }

  const template = fs.readFileSync(path.join(__dirname, 'env.ejs'), 'utf8')

  const data = ejs.render(template, { getValue })

  fs.writeFileSync(path.join(root, '.env'), data, 'utf8')

  if(process.env.CIRCLE_SHA1) {
    fs.writeFileSync(path.join(root, 'REVISION'), process.env.CIRCLE_SHA1, 'utf8')
  }

}

export default env
