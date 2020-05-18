const ChannelSerializer = (req, result) => ({
  type: result.get('type'),
  id: result.get(result.get('key')),
  label: result.get('label'),
  optedin_at: result.get('optedin_at'),
  optedout_at: result.get('optedout_at'),
  optin_reason: result.get('optin_reason'),
  optout_reason: result.get('optout_reason'),
  optout_reason_other: result.get('optout_reason_other'),
  code: result.get('code'),
  has_consented: result.get('has_consented')
})

export default ChannelSerializer
