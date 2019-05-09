import request from 'request-promise'
import { Router } from 'express'
import sharp from 'sharp'
import path from 'path'
import url from 'url'
import qs from 'qs'

const router = new Router({ mergeParams: true })

router.get('/*', async (req, res) => {
  const transformed = await transform(req.originalUrl)
  const type = getType(req.originalUrl)
  const data = await convert(transformed, type)
  res.type(type).status(200).send(data)
})

const convert = async (transformed, type) => {
  if(type === 'jpeg') return await transformed.jpeg({ quality: 70 }).toBuffer()
  if(type === 'png') return await transformed.png({ quality: 70 }).toBuffer()
}

const getType = (originalUrl) => {
  const ext = path.extname(originalUrl).substr(1)
  if(ext === 'jpg') return 'jpeg'
  if(ext === 'jpeg') return 'jpeg'
  if(ext === 'png') return 'png'
  if(ext === 'gif') return 'gif'
}

const transform = async(originalUrl) => {
  const uri = url.parse(originalUrl)
  const raw = uri.path.replace('/imagecache/', '')
  const parts = raw.split('/')
  const matches = parts[0].match(/\w*=\w*/)
  const transform = matches ? qs.parse(parts[0]) : {}
  const path = matches ? parts.slice(1).join('/') : parts.join('/')
  const original = await request.get({
    url: `${process.env.DATA_ASSET_HOST}/${path}`,
    encoding: null
  })
  const source = sharp(original)
  const dpi = transform.dpi ? parseInt(transform.dpi) : 1
  const fit = transform.fit || 'inside'
  const w = transform.w ? parseInt(transform.w) * dpi : null
  const h = transform.h ? parseInt(transform.h) * dpi : null
  if(w & h) return source.resize(w, h, { fit })
  if(w) return source.resize(w)
  if(h) return source.resize(h)
  return source
}

export default router
