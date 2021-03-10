import Form from '@apps/forms/models/form'

const getForms = async () => {
  const forms = await Form.fetchAll()
  return forms
}

export default getForms
