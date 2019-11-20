const InvoiceSerializer = (req, result) => ({
  id: result.get('id'),
  code: result.get('code'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default InvoiceSerializer
