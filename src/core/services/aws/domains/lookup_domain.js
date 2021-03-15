import { route53Domains } from '@core/vendor/aws'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const tlds = JSON.parse(fs.readFileSync(path.join(__dirname,'tlds.json')))

const getPrice = (fqdn) => {
  const name = fqdn.split('.').slice(1).join('.')
  const tld = _.find(tlds, { name })
  return tld.registration_price
}

const getStatus = (availability) => {
  return  availability === 'AVAILABLE' ? 'available' : 'unavailable'
}

const lookupDomain = async(req, { name }) => {

  const availability = await route53Domains.checkDomainAvailability({
    DomainName: name
  }).promise()

  const suggestions = await route53Domains.getDomainSuggestions({
    DomainName: name,
    OnlyAvailable: true,
    SuggestionCount: 15
  }).promise()

  return {
    domain: {
      name: name,
      status: getStatus(availability.Availability),
      price: getPrice(name)
    },
    suggestions: suggestions.SuggestionsList.map(suggestion => ({
      name: suggestion.DomainName,
      status: getStatus(suggestion.Availability),
      price: getPrice(suggestion.DomainName)
    }))
  }
}

export default lookupDomain
