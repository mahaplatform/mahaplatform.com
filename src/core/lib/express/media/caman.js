import Caman from '../../../services/caman'
import s3 from '../../../services/s3'
import { Router } from 'express'
import path from 'path'
import url from 'url'
import qs from 'qs'

const router = new Router({ mergeParams: true })

router.get('/*', async (req, res) => {
  const type = getType(req.originalUrl)
  const data = await transform(type, req.originalUrl)
  res.type(type).status(200).send(data)
})

const getType = (originalUrl) => {
  const ext = path.extname(originalUrl).substr(1)
  if(ext === 'png') return 'png'
  if(ext === 'gif') return 'gif'
  return 'jpeg'
}

const transform = async(type, originalUrl) => {
  const uri = url.parse(originalUrl)
  const raw = uri.path.replace('/caman/', '')
  const parts = raw.split('/')
  const matches = parts[0].match(/\w*=\w*/)
  const transforms = matches ? qs.parse(parts[0]) : {}
  const path = matches ? parts.slice(1).join('/') : parts.join('/')
  const data = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: path
  }).promise().then(file => file.Body)

  return await new Promise((resolve, reject) => {
    Caman(data, function() {
      const { blur, bri, con, crop, exp, filter, flip, gamma, hue, invert, noise, rot, sat, sepia, sharp, vibrance } = transforms
      if(crop) this.crop(parseInt(crop.w), parseInt(crop.h), parseInt(crop.x), parseInt(crop.y))
      if(blur) this.stackBlur(parseInt(blur))
      if(bri) this.brightness(parseInt(bri))
      if(con) this.contrast(parseInt(con))
      if(exp) this.exposure(parseInt(exp))
      if(filter) this[filter]()
      if(flip) this.flip(flip)
      if(gamma) this.gamma(parseInt(gamma))
      if(hue) this.hue(parseInt(hue))
      if(invert) this.invert()
      if(noise) this.noise(parseInt(noise))
      if(sat) this.saturation(parseInt(sat))
      if(sepia) this.sepia(parseInt(sepia))
      if(sharp) this.sharp(parseInt(sharp))
      if(vibrance) this.vibrance(parseInt(vibrance))
      if(rot) this.rotate(parseInt(rot))
      this.render(function () {
        resolve(this.canvas.toBuffer(type))
      })
    })
  })
}

export default router
