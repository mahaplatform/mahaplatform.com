import s3 from '../../../vendor/aws/s3'
import mime from 'mime-types'
import sharp from 'sharp'
import path from 'path'
import _ from 'lodash'
import url from 'url'
import qs from 'qs'
import fs from 'fs'

const root = path.resolve(__dirname,'..','..','..','..','public')

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
  let source = sharp(data)
  source = flip(source, transforms)
  source = rotate(source, transforms)
  source = crop(source, transforms)
  source = await saturation(source, transforms)
  source = await brightness(source, transforms)
  source = await contrast(source, transforms)
  source = pad(source, transforms)
  source = resize(source, transforms)
  source = await overlay(source, transforms)
  return source
}

const clamp = (value) => Math.max(Math.min(value, 255), 0)

const brightness = async (source, params) => {
  if(!params.bri) return source
  const bri = Math.floor(255 * (parseInt(params.bri) / 100))
  const { width, height, channels } = await source.metadata()
  const buffer = await source.raw().toBuffer()
  for(var i = 0; i < buffer.length; i += channels) {
    buffer[i] = clamp(buffer[i] + bri)
    buffer[i + 1] = clamp(buffer[i + 1] + bri)
    buffer[i + 2] = clamp(buffer[i + 2] + bri)
  }
  return sharp(buffer, { raw: { width, height, channels } })
}

const contrast = async (source, params) => {
  if(!params.con) return source
  const con = Math.pow((parseInt(params.con) + 100) / 100, 2)
  const { width, height, channels } = await source.metadata()
  const buffer = await source.raw().toBuffer()
  for(var i = 0; i < buffer.length; i += channels) {
    buffer[i] = clamp(((((buffer[i] / 255) - 0.5) * con) + 0.5) * 255)
    buffer[i + 1] = clamp(((((buffer[i + 1] / 255) - 0.5) * con) + 0.5) * 255)
    buffer[i + 2] = clamp(((((buffer[i + 2] / 255) - 0.5) * con) + 0.5) * 255)
  }
  return sharp(buffer, { raw: { width, height, channels } })
}

const saturation = async (source, params) => {
  if(!params.sat) return source
  const sat = parseInt(params.sat) * -0.01
  const { width, height, channels } = await source.metadata()
  const buffer = await source.raw().toBuffer()
  for(var i = 0; i < buffer.length; i += channels) {
    const max = Math.max(buffer[i], buffer[i + 1], buffer[i + 2])
    if(buffer[i] !== max) buffer[i] = clamp(buffer[i] + (max - buffer[i]) * sat)
    if(buffer[i + 1] !== max) buffer[i + 1] = clamp(buffer[i + 1] + (max - buffer[i + 1]) * sat)
    if(buffer[i + 2] !== max) buffer[i + 2] = clamp(buffer[i + 2] + (max - buffer[i + 2]) * sat)
  }
  return sharp(buffer, { raw: { width, height, channels } })
}

const overlay = async (source, { dpi = 1, w, overlay }) => {
  if(!overlay) return source
  const width = w ? parseInt(w) * parseInt(dpi) : null
  if(overlay && overlay === 'video') {
    source.composite([{
      input: await getOverlay(width)
    }])
  }
  return source
}

const flip = (source, { flip }) => {
  if(!flip) return source
  if(flip === 'h') return source.flop()
  if(flip === 'v') return source.flip()
}

const rotate = async (source, { rot }) => {
  if(!rot) return source
  return source.rotate(parseInt(rot))
}

const crop = (source, { crop }) => {
  if(!crop) return source
  const [left, top, width, height] = crop.split(',')
  source.extract({
    left:  parseInt(left),
    top: parseInt(top),
    width: parseInt(width),
    height: parseInt(height)
  })
  return source
}

const resize = (source, { dpi = 1, fit = 'inside', w, h }) => {
  if(!w && !h) return source
  const width = w ? parseInt(w) * parseInt(dpi) : null
  const height = h ? parseInt(h) * parseInt(dpi) : null
  if(width && height) return source.resize(width, height, { fit })
  if(width) return source.resize(width)
  if(height) return source.resize(height)
}

const pad = (source, { p, pt, pl, pb, pr, bg }) => {
  if(!bg || (!p && !pt && !pl && !pb && !pr)) return source
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

const imagecache = async (req, res) => {
  const url = parseUrl(req.originalUrl)
  const type = getType(url)
  const data = await getTransformed(url, type)
  if(process.env.NODE_ENV === 'production') {
    res.setHeader('Cache-Control','immutable,max-age=100000000,public')
  }
  const mimetype = mime.lookup(type)
  return res.type(mimetype).status(200).send(data)
}

export default imagecache
