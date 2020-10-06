const BankSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  bank_name: result.get('bank_name'),
  routing_number: result.get('routing_number'),
  account_number: result.get('account_number'),
  braintree_id: result.get('braintree_id'),
  braintree_link: result.get('braintree_link'),
  has_paypal: result.get('has_paypal'),
  status: result.get('status'),
  integration: integration(req, result),
  team: team(result.related('team')),
  applied_on: result.get('applied_on'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const team = (team) => {
  if(!team.id) return null
  return {
    id: team.get('id'),
    title: team.get('title')
  }
}

const integration = (req, result) => {
  const integration = req.apps.finance.settings.integration
  if(integration === '' || integration === null) return null
  return result.get('integration')
}

export default BankSerializer
