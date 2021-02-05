import lambda from '@core/vendor/aws/lambda'
import { execSync } from 'child_process'
import rimraf from 'rimraf'
import zip from 'adm-zip'
import path from 'path'
import fs from 'fs'

const listFiles = (basedir, localdir = '.') => {
  return fs.readdirSync(path.join(basedir, localdir)).reduce((files, file) => {
    const localpath = path.join(localdir,file)
    const basepath = path.join(basedir,localpath)
    return [
      ...files,
      ...fs.lstatSync(basepath).isDirectory() ? listFiles(basedir, localpath) : [
        {
          name: localpath,
          data: fs.readFileSync(basepath)
        }
      ]
    ]
  }, [])
}

const layer = async (name) => {

  const layerDir = path.join('src','core','lib','express','twilio','lambda','layer')

  const outfile = path.join('tmp','layer.zip')

  rimraf.sync(path.join(layerDir,'node_modules'))

  await execSync('npm install', {
    cwd: path.join(layerDir)
  })

  const files = listFiles(layerDir)

  const archive = new zip()
  files.filter(file => {
    return !/^package/.test(file.name)
  }).map(file => archive.addFile(`nodejs/${file.name}`, file.data))
  archive.writeZip(outfile)

  const layer = await lambda.publishLayerVersion({
    CompatibleRuntimes: [
      'nodejs12.x'
    ],
    LayerName: 'maha-layer',
    Content: {
      ZipFile: fs.readFileSync(outfile)
    }
  }).promise()

  await Promise.mapSeries(['call','sms','sms-status','voice','voice-status'],  async (func) => {
    await lambda.updateFunctionConfiguration({
      FunctionName: `twilio-${func}`,
      Layers: [layer.LayerVersionArn]
    }).promise()
  })

}

export default layer
