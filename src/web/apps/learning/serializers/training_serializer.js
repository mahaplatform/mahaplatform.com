const trainingSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  description: result.get('description'),
  type: result.get('type'),
  url: result.get('url'),
  location: result.get('location'),
  contact: result.get('contact'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default trainingSerializer
