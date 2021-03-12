export const normalizeUrl = (url) => {
  if(/^\/websites\/[^/]*\/$/.test(url)) return url.slice(0,-1)
  return url
}
