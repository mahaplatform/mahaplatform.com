const DashboardCardSerializer = (req, card) => ({
  id: card.get('id'),
  title: card.get('title'),
  type: card.get('type'),
  delta: card.get('delta'),
  config: card.get('config'),
  created_at: card.get('created_at'),
  updated_at: card.get('updated_at')
})

export default DashboardCardSerializer
