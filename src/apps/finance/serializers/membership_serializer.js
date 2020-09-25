const MembershipSerializer = (req, result) => ({
  id: result.get('id'),
  display: result.get('display'),
  title: result.get('title'),
  is_active: result.get('is_active'),
  integration: integration(req, result),
  member_type: result.get('member_type') ? result.get('member_type').toLowerCase() : 'member'
})

const integration = (req, result) => {
  const { integration } = req.apps.finance.settings
  if(integration === '' || integration === null) return null
  return result.get('integration')
}

export default MembershipSerializer
