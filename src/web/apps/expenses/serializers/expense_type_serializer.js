const expenseTypeSerializer = (req, result) => ({
  id: result.get('id'),
  display: result.get('display'),
  title: result.get('title'),
  description: result.get('description'),
  is_active: result.get('is_active'),
  integration: integration(req, result),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const integration = (req, result) => {

  const integration = req.apps.expenses.settings.integration

  if(integration === '' || integration === null) return null

  return result.get('integration')

}

export default expenseTypeSerializer
