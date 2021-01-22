import URL from 'url'
import qs from 'qs'

export const parseUrl = (uri) => {

  const url = URL.parse(uri)

  url.qsargs = url.search ? qs.parse(url.search.substr(1)) : null

  return url

}
