const CampaignSerializer = (req, result) => ({
  id: result.get('item_id'),
  title: result.get('title'),
  program: program(result.related('program')),
  type: result.get('type'),
  code: result.get('code'),
  direction: result.get('direction'),
  status: result.get('status'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title')
  }
}

export default CampaignSerializer
