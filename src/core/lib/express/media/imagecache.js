import s3 from '../../../vendor/aws/s3'
import { Router } from 'express'
import mime from 'mime-types'
import sharp from 'sharp'
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

const router = new Router({ mergeParams: true })

router.get('/*', async (req, res) => {
  const url = parseUrl(req.originalUrl)
  const type = getType(url)
  const data = await getTransformed(url, type)
  if(process.env.NODE_ENV === 'production') {
    res.setHeader('Cache-Control','immutable,max-age=100000000,public')
  }
  const mimetype = mime.lookup(type)
  return res.type(mimetype).status(200).send(data)
})

const getOriginal = async (url) => {
  const fm = url.transforms ? url.transforms.fm : null
  const originalPath = fm ? url.path.replace(url.extension, fm) : url.path
  return await getData(originalPath)
}

const getTransformed = async (url, type) => {
  const original = await getOriginal(url)
  if(!url.transforms) return original
  const transformed = await transform(original, url.transforms)
  return await convert(transformed, type, url.transforms)
}

const getType = (url) => {
  const to = url.transforms ? url.transforms.to : null
  const ext = to || url.extension
  return _.includes(['gif','png','webp'], ext) ? ext : 'jpeg'
}

const parseUrl = (original) => {
  const uri = url.parse(original)
  const raw = uri.path.replace('/imagecache/', '')
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

const getOverlay = async (w) => {
  const data = fs.readFileSync(path.join(root,'images','play.png'))
  const width = parseInt(w / 10)
  return sharp(data).resize(width).png({ quality: 100 }).toBuffer()
}

const transform = async(data, transforms) => {
  const source = sharp(data)
  await overlay(source, transforms)
  crop(source, transforms)
  resize(source, transforms)
  pad(source, transforms)
  return source
}

const overlay = async (source, { dpi = 1, w, overlay }) => {
  if(!overlay) return
  const width = w ? parseInt(w) * parseInt(dpi) : null
  if(overlay && overlay === 'video') {
    source.composite([{
      input: await getOverlay(width)
    }])
  }
}

const crop = (source, { ct, cl, cw, ch }) => {
  if(!ct || !cl || !cw || !ch) return
  source.extract({
    left:  parseInt(cl),
    top: parseInt(ct),
    width: parseInt(cw),
    height: parseInt(ch)
  })
}

const resize = (source, { dpi = 1, fit = 'inside', w, h }) => {
  if(!w && !h) return
  const width = w ? parseInt(w) * parseInt(dpi) : null
  const height = h ? parseInt(h) * parseInt(dpi) : null
  if(width & height) return source.resize(width, height, { fit })
  if(width) return source.resize(width)
  if(height) return source.resize(height)
}

const pad = (source, { p, pt, pl, pb, pr, bg }) => {
  if(!bg || (!p && !pt && !pl && !pb && !pr)) return
  const padding = p ? parseInt(p) : null
  const top = pt ? parseInt(pt) : null
  const right = pr ? parseInt(pr) : null
  const bottom = pb ? parseInt(pb) : null
  const left = pl ? parseInt(pl) : null
  return source.extend({
    top: padding || top || null,
    right: padding || right || null,
    bottom: padding || bottom || null,
    left: padding || left || null,
    background: `#${bg}`
  })
}

const convert = async (transformed, type, transforms) => {
  const quality = transforms.q ? parseInt(transforms.q) : 70
  if(type === 'jpeg') return await transformed.jpeg({ quality }).toBuffer()
  if(type === 'webp') return await transformed.webp({ quality }).toBuffer()
  return await transformed.png({ quality }).toBuffer()
}

export default router
