import path from 'path'
import qs from 'qs'

export const icon = (src, format, transforms, encode = false) => {
  const parsed = path.parse(src)
  const extname = parsed.ext.substr(1)
  if(format !== extname) transforms.fm = extname
  const query = qs.stringify(transforms)
  const host = process.env.NODE_ENV !== 'production' ? 'https://assets.mahaplatform.com' : ''
  const url = `${host}/imagecache/${query}${parsed.dir}/${parsed.name}.${format}`
  return encode ? encodeURIComponent(url) : url
}
