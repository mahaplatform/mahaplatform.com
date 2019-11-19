const expenseTypeProjectSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  description: result.get('description'),
  integration: integration(req, result),
  enabled: result.get('enabled'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const integration = (req, result) => {

  const integration = req.apps.finance.settings.integration

  if(integration === '' || integration === null) return null

  return result.get('integration')

}

export default expenseTypeProjectSerializer
