import request from 'request-promise'
import path from 'path'
import fs from 'fs'

const root = path.resolve(__dirname,'..','..','..','..','..','public','crm')

export const readFile = async (filename) => {
  if(process.env.NODE_ENV === 'development') {
    console.log(`${process.env.WEB_HOST}/crm/${filename}`)
    const response = await request.get(`${process.env.WEB_HOST}/crm/${filename}`, {
      resolveWithFullResponse: true,
      encoding: null,
      rejectUnauthorized: false,
      insecure: true
    })
    return response.body.toString()
  }
  const filepath = path.join(root,filename)
  return fs.readFileSync(filepath, 'utf8')
}
