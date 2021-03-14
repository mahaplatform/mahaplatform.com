import { route53Domains } from '@core/vendor/aws'

const lookupDomain = async(req, { name }) => {

  const suggestions = await route53Domains.getDomainSuggestions({
    DomainName: name,
    OnlyAvailable: true,
    SuggestionCount: 15
  }).promise()

  return suggestions.data.map(suggestion => ({
    name: suggestion.data.DomainName,
    status: suggestion.data.Availability === 'AVAILABLE' ? 'available' : 'unavailable'
  }))

}

export default lookupDomain
