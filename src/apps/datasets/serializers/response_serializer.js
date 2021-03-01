const responseSerializer = (req, result) => ({
  id: result.get('id'),
  contact: {
    display_name: 'Baz Perry'
  },
  record: {
    title: 'Full Plate Farm'
  },
  status: result.get('status'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default responseSerializer
