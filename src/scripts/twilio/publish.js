import lambda from '@core/vendor/aws/lambda'
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
        { data: fs.readFileSync(basepath, 'utf8'), name: localpath }
      ]
    ]
  }, [])
}

const publish = async (name) => {

  const outfile = path.join('tmp',`${name}.zip`)

  const files = listFiles(path.join('src','twilio',name))

  const archive = new zip()
  files.map(file => archive.addFile(file.name, file.data))
  archive.writeZip(outfile)

  await lambda.updateFunctionCode({
    FunctionName: `twilio-${name}`,
    ZipFile: fs.readFileSync(outfile)
  }).promise()

}

export default publish
