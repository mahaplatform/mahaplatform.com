import { deleteObjects, upload } from '@core/services/aws/s3'
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

const test = async () => {

  const files = listFiles(path.join('src','core','lib','express','twilio','lambda','twiml'))

  await Promise.mapSeries(files, async (file) => {
    await upload(null, {
      acl: 'private',
      bucket: process.env.AWS_BUCKET,
      key: `twiml/${file.name.replace('.json','')}`,
      cache_control: 'max-age=0,no-cache',
      content_type: 'application/json',
      file_data: file.data
    })
  })



}

export default test
