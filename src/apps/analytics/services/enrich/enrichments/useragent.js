import UAParser from 'ua-parser-js'

const useragentEnrichment = async(req, event) => {

  if(!event.useragent) return event

  const ua = UAParser(event.useragent)

  return {
    ...event,
    dvce_type: ua.device.type || 'computer',
    dvce_ismobile: null,
    dvce_manufacturer: ua.device.vendor,
    os_name: ua.os.name,
    os_version: ua.os.version,
    os_family: null,
    os_manufacturer: null,
    br_name: ua.browser.name,
    br_renderengine: null,
    br_family: null,
    br_type: null,
    br_version: ua.browser.major
  }

}

export default useragentEnrichment
