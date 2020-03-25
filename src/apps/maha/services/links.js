import Service from '../models/service'
import Link from '../models/link'
import cheerio from 'cheerio'
import request from 'request'
import og from 'open-graph'
import _ from 'lodash'
import Url from 'url'

const download = async (url) => await new Promise((resolve, reject) => {

  request({
    url: url,
    rejectUnauthorized: false,
    encoding: 'utf8',
    gzip: true,
    jar: true
  }, (err, res, body) => {

    if(err) return reject(err)

    return resolve(res)

  })

})


const processImageUrl = (url, response) => ({
  type: 'image',
  image_url: url
})

const getDescription = (description) => {
  if(!description) return ''
  if(_.isArray(description)) return description.join().substr(0, 255)
  return description.substr(0, 255)
}

const processOpenGraphUrl = async (req, uri, url, response) => {

  const meta = og.parse(response.body)

  const $ = cheerio.load(response.body)

  const service = await getService(req, $, url)

  if(Object.keys(meta).length > 0) {
    return {
      service_id: service.get('id'),
      text: getDescription(meta.description),
      title: meta.title,
      link: meta.url,
      ...getImage(uri, meta.image),
      ...getVideo(uri, meta.video)
    }
  }

  return {
    service_id: service.get('id'),
    text: $('meta[name=description]').attr('content') || $('meta[name=Description]').attr('content') || '',
    title: $('title').eq(0).text(),
    link: url
  }

}

const unpackOgArray = (value) => {
  if(!value) return null
  if(_.isArray(value)) return value[0]
  return value
}

const getService = async (req, $, url) => {

  const uri = Url.parse(url)

  const name = uri.hostname

  const service = await Service.query(qb => {
    qb.where('name', name)
  }).fetch({
    transacting: req.trx
  })

  if(service) return service

  const icons = [
    ...$('link[rel="icon"]').toArray(),
    ...$('link[rel="shortcut icon"]').toArray(),
    ...$('link[rel="Shortcut Icon"]').toArray(),
    ...$('link[rel="apple-touch-icon"]').toArray(),
    ...$('link[rel="image_src"]').toArray()
  ].sort((a, b) => {
    if(a.attribs.sizes > b.attribs.sizes) return -1
    if(a.attribs.sizes < b.attribs.sizes) return 1
    return 0
  })

  const href = icons.length > 0 ? icons[0].attribs.href : null

  return await Service.forge({
    name,
    icon: href ? absoluteUrl(uri, href) : null
  }).save(null, {
    transacting: req.trx
  })

}

const getImage = (uri, image) => {
  if(!image) return {}
  const image_url = image.secure_url ? unpackOgArray(image.secure_url) : unpackOgArray(image.url)
  return {
    image_url: absoluteUrl(uri, image_url),
    image_width: unpackOgArray(image.width),
    image_height:  unpackOgArray(image.height)
  }
}

const getVideo = (uri, video) => {
  if(!video) return {}
  const video_url = video.secure_url ? unpackOgArray(video.secure_url) : unpackOgArray(video.url)
  return {
    video_url: absoluteUrl(uri, video_url),
    video_width: unpackOgArray(video.width),
    video_height: unpackOgArray(video.height)
  }
}

const absoluteUrl = (uri, url) => {
  return Url.resolve(`${uri.protocol}//${uri.host}/${uri.pathname}`, url)
}

export const getMetaData = async (req, url) => {
  const uri = Url.parse(url)
  const response = await download(url)
  if(response.statusCode !== 200) return null
  const type = response.headers['content-type'].split('/')[0]
  if(type === 'image') return processImageUrl(url, response)
  return processOpenGraphUrl(req, uri, url, response)
}

export const findOrCreateByUrl = async (req, url) => {

  const link = await Link.query(qb => {
    qb.where('url', url)
  }).fetch({
    withRelated: ['service'],
    transacting: req.trx
  })

  if(link) return link

  const meta = await getMetaData(req, url)

  if(!meta || !meta.title) return null

  const newlink = await Link.forge({
    url,
    ...meta
  }).save(null, {
    transacting: req.trx
  })

  await newlink.load(['service'], {
    transacting: req.trx
  })

  return newlink

}
