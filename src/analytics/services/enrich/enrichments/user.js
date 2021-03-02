import URL from 'url'
import qs from 'qs'

const userEnrichment = async(req, event) => {

  const url = event.page_url ? URL.parse(event.page_url) : {}

  const args = url.search ? qs.parse(url.search.substr(1)) : {}

  return {
    ...event,
    user_id: event.user_id || args.cid || null
  }

}

export default userEnrichment
