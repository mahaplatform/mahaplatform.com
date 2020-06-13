const DashboardPanelSerializer = (req, panel) => ({
  id: panel.get('id'),
  owner: user(panel.related('owner')),
  title: panel.get('title'),
  config: panel.get('config'),
  cards: panel.related('cards').map(card),
  created_at: panel.get('created_at'),
  updated_at: panel.get('updated_at')
})

const user = (user, key) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo') ? user.related('photo').get('path') : null
  }
}

const card = (card, key) => {
  if(!card.id) return null
  return {
    id: card.get('id'),
    title: card.get('title'),
    type: card.get('type'),
    delta: card.get('delta'),
    config: card.get('config')
  }
}

export default DashboardPanelSerializer
