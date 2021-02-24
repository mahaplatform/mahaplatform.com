import transactionEnrichment from './transaction'
import timestampsEnrichment from './timestamps'
import useragentEnrichment from './useragent'
import ipaddressEnrichment from './ipaddress'
import campaginEnrichment from './campaign'
import referrerEnrichment from './referrer'
import contextEnrichment from './context'
import pageEnrichment from './page'
import userEnrichment from './user'

const enrichments = [
  pageEnrichment,
  referrerEnrichment,
  ipaddressEnrichment,
  campaginEnrichment,
  transactionEnrichment,
  useragentEnrichment,
  contextEnrichment,
  timestampsEnrichment,
  userEnrichment
]

export default enrichments
