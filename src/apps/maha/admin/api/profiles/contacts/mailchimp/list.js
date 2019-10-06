import { getClient } from '../../services/mailchimp'

const list = async (req, profile) => {

  const client = await getClient(req, profile)

  records.pagination = {
    skip: skiptoken ? 1 : 0,
    next: result['@odata.nextLink'] ? result['@odata.nextLink'].match(/skiptoken=(.*)/)[1] : null
  }

  return records

}

export default list
