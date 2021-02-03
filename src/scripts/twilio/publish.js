import lambda from '@core/vendor/aws/lambda'
import log from '../../core/utils/log'
import zip from 'adm-zip'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const listFiles = (basedir, localdir = '.') => {
  return fs.readdirSync(path.join(basedir, localdir)).reduce((files, file) => {
    const localpath = path.join(localdir,file)
    const basepath = path.join(basedir,localpath)
    return [
      ...files,
      ...fs.lstatSync(basepath).isDirectory() ? listFiles(basedir, localpath) : [
        { data: fs.readFileSync(basepath, 'utf8'), name: localpath }
      ]
    ]
  }, [])
}

const publish = async (keys) => {

  const functions = keys ? _.castArray(keys) : ['call','sms','sms_status','voice','voice_status']

  await Promise.mapSeries(functions, async (name) => {

    log('info', 'twilio', `Publishing ${name}`)

    const outfile = path.join('tmp',`${name}.zip`)

    const files = listFiles(path.join('src','core','twilio',name))

    const archive = new zip()
    files.map(file => archive.addFile(file.name, file.data))
    archive.writeZip(outfile)

    await lambda.updateFunctionCode({
      FunctionName: `twilio-${name.replace('_', '-')}`,
      ZipFile: fs.readFileSync(outfile)
    }).promise()

  })

}

export default publish
