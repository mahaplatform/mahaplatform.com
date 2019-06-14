const MembershipSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  integration: integration(req, result),
  member_type: result.get('member_type').toLowerCase()
})

const integration = (req, result) => {

  const integration = req.apps.expenses.settings.integration

  if(integration === '' || integration === null) return null

  return result.get('integration')

}

export default MembershipSerializer
