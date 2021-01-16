import { createCanvas, loadImage }from 'canvas'
import s3 from '../../../vendor/aws/s3'
import mime from 'mime-types'
import path from 'path'
import _ from 'lodash'
import url from 'url'
import qs from 'qs'
import fs from 'fs'

const getRoot = (env) => {
  const root = path.resolve(__dirname,'..','..','..')
  if(env === 'production') return path.join(root,'..','public')
  return path.join(root,'admin','public')
}

const root = getRoot(process.env.NODE_ENV)

const getImage = async (url) => {
  const fm = url.transforms ? url.transforms.fm : null
  const originalPath = fm ? url.path.replace(url.extension, fm) : url.path
  const data = await getData(originalPath)
  return await loadImage(data)
}

const getTransformed = async (url, type) => {
  const image = await getImage(url)
  const canvas = createCanvas(200, 200)
  const ctx = canvas.getContext('2d')
  ctx.font = '30px Impact'
  ctx.rotate(0.1)
  ctx.fillText('Awesome!', 50, 100)
  var text = ctx.measureText('Awesome!')
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke()
  ctx.drawImage(image, 50, 0, 70, 70)
  return canvas.toBuffer()
}

const getType = (url) => {
  const to = url.transforms ? url.transforms.to : null
  const ext = to || url.extension
  return _.includes(['gif','png','webp'], ext) ? ext : 'jpeg'
}

const parseUrl = (original) => {
  const uri = url.parse(original)
  const raw = uri.path.replace('/imagefilter/', '')
  const parts = raw.split('/')
  const matches = parts[0].match(/\w*=\w*/)
  return {
    basename: path.basename(original),
    extension: path.extname(original).substr(1),
    original,
    transforms: matches ? qs.parse(parts[0]) : null,
    path: matches ? parts.slice(1).join('/') : parts.join('/')
  }
}

const getData = async (key) => {
  const filepath = path.join(root, key.replace('admin/', ''))
  if(fs.existsSync(filepath)) {
    return fs.readFileSync(filepath)
  }
  return await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: key
  }).promise().then(file => file.Body)
}

const imagefilter = async (req, res) => {
  const url = parseUrl(req.originalUrl)
  const type = getType(url)
  const data = await getTransformed(url, type)
  if(process.env.NODE_ENV === 'production') {
    res.setHeader('Cache-Control','immutable,max-age=100000000,public')
  }
  const mimetype = mime.lookup(type)
  return res.type(mimetype).status(200).send(data)
}

export default imagefilter
