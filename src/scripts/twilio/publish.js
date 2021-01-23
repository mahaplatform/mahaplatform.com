import twilio from '@core/vendor/twilio'
import rp from 'request-promise'
import path from 'path'
import fs from 'fs'

const serviceSid = 'ZSfdf303cd6cb6fb04827cb2dfb3df7dff'
const functionSid = 'ZHc347065ee0be16908b3eb798ef11530e'
const environmentSid = 'ZEe9248698f18186d23a6b4ddc7f66e64f'

const checkStatus = async (buildSid) => {
  const status = await twilio.serverless.services(serviceSid).builds(buildSid).buildStatus().fetch()
  console.log(status.status)
  if(status.status === 'failed') throw new Error('failed')
  if(status.status === 'completed') return status
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return await checkStatus(buildSid)
}

const publish = async () => {

  const code = fs.readFileSync(path.join('src','twilio','call.js'), 'utf8')

  const version = await rp({
    uri: `https://serverless-upload.twilio.com/v1/Services/${serviceSid}/Functions/${functionSid}/Versions`,
    method: 'post',
    formData: {
      Content: {
        value: code,
        options: {
          contentType: 'application/javascript'
        }
      },
      Path: '/call',
      Visibility: 'public'
    },
    json: true,
    auth: {
      user: process.env.TWILIO_ACCOUNT_SID,
      password: process.env.TWILIO_AUTH_TOKEN
    }
  })

  const build = await twilio.serverless.services(serviceSid).builds.create({
    dependencies: JSON.stringify([
      { name: 'lodash', version: '4.17.11' },
      { name: 'twilio', version: '3.29.2' },
      { name: 'fs', version: '0.0.1-security' },
      { name: 'request-promise', version: '4.2.6' },
      { name: 'xmldom', version: '0.1.27' },
      { name: 'util', version: '0.11.0' }
    ]),
    functionVersions: [version.sid]
  })

  const status = await checkStatus(build.sid)

  const deployment = await twilio.serverless.services(serviceSid).environments(environmentSid).deployments.create({
    buildSid: build.sid
  })

}

export default publish
