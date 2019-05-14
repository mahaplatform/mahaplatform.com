import Attachment from '../models/attachment'
import getUrls from 'get-urls'
import _ from 'lodash'
import Url from 'url'
import os from 'os'

const ifaces = os.networkInterfaces()

const domains = [
  'localhost',
  'dev.mahaplatform.com',
  process.env.DOMAIN,
  ...!_.isEmpty(process.env.DATA_ASSET_HOST) ? [Url.parse(process.env.DATA_ASSET_HOST).hostname] : [],
  ...!_.isEmpty(process.env.DATA_ASSET_CDN_HOST) ? [Url.parse(process.env.DATA_ASSET_CDN_HOST).hostname] : []
]

const localhosts = Object.keys(ifaces).reduce((ips, iface) => [
  ...ips,
  ...ifaces[iface].map(adapter => adapter.address)
], domains)

const getMetaData = async (url, trx) => {

  const uri = Url.parse(url)

  if(_.includes(localhosts, uri.hostname)) return processLocalUrl(url, uri)

  return null

}

const processLocalUrl = (url, uri) => {

  const matches = uri.pathname.match(/assets\/(\d*)\/.*/)

  if(matches) return {
    type: 'asset',
    asset_id: matches[1],
    title_link: url
  }

  return processLocalPathname(uri.pathname)

}

const processLocalPathname = (pathname) => {

  return {
    type: 'local',
    title_link: pathname
  }

}

const createAttachment = async (attachable, index, url, trx) => {

  const meta = await getMetaData(url, trx)

  if(!meta) return null

  const data = {
    team_id: attachable.get('team_id'),
    attachable_type: attachable.tableName,
    attachable_id: attachable.get('id'),
    delta: index,
    from_url: url,
    ...meta
  }

  await Attachment.forge(data).save(null, { transacting: trx })

}

const normalizeUrl = (text, url) => {

  let normalized = url.replace('?null', '')

  if(text.search(normalized) < 0) {
    normalized = normalized.replace(/\/+$/, '')
  }

  return normalized

}

export const lookupUrl = async (url, trx) => {

  const meta = await getMetaData(url, trx)

  if(!meta) return null

  return {
    from_url: url,
    ...meta
  }

}

export const extractAttachments = async (attachable, text, trx) => {

  text = text.replace('<p>','').replace('</p>', '\r\n')

  const urls = getUrls(text, {
    sortQueryParameters: false,
    removeTrailingSlash: true,
    stripWWW: false,
    stripFragment: false,
    normalizeProtocol: false
  })

  if(urls.size === 0) return

  await Promise.mapSeries(urls, async(url, index) => {

    const normalizedUrl = normalizeUrl(text, url)

    await createAttachment(attachable, index, normalizedUrl, trx)

  })

}
