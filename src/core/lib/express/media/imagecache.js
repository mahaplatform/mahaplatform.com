import s3 from '../../../services/s3'
import { Router } from 'express'
import sharp from 'sharp'
import path from 'path'
import url from 'url'
import qs from 'qs'

const router = new Router({ mergeParams: true })

router.get('/*', async (req, res) => {
  const type = getType(req.originalUrl)
  const { transforms, path } = parseUrl(req.originalUrl)
  const original = await getData(path)
  if(!transforms) return res.type(type).status(200).send(original)
  const transformed = await transform(original, transforms)
  const data = await convert(transformed, type)
  return res.type(type).status(200).send(data)
})

const getType = (originalUrl) => {
  const ext = path.extname(originalUrl).substr(1)
  if(ext === 'png') return 'png'
  if(ext === 'gif') return 'gif'
  return 'jpeg'
}

const parseUrl = (originalUrl) => {
  const uri = url.parse(originalUrl)
  const raw = uri.path.replace('/imagecache/', '')
  const parts = raw.split('/')
  const matches = parts[0].match(/\w*=\w*/)
  const transforms = matches ? qs.parse(parts[0]) : null
  const path = matches ? parts.slice(1).join('/') : parts.join('/')
  return { transforms, path }
}

const getData = async (path) => {
  return await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: path
  }).promise().then(file => file.Body)
}

const transform = async(data, transforms) => {
  const source = sharp(data)
  const dpi = transforms.dpi ? parseInt(transforms.dpi) : 1
  const fit = transforms.fit || 'inside'
  const w = transforms.w ? parseInt(transforms.w) * dpi : null
  const h = transforms.h ? parseInt(transforms.h) * dpi : null
  if(w & h) return source.resize(w, h, { fit })
  if(w) return source.resize(w)
  if(h) return source.resize(h)
  return source
}

const convert = async (transformed, type) => {
  if(type === 'jpeg') return await transformed.jpeg({ quality: 70 }).toBuffer()
  if(type === 'png') return await transformed.png({ quality: 70 }).toBuffer()
}

export default router
