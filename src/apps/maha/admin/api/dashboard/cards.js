import collectObjects from '@core/utils/collect_objects'
import _ from 'lodash'

const dashboardCards = collectObjects('admin/dashboard/index.js').reduce((cards, file) => [
  ...cards,
  ...file.default.map(card => ({
    ...card,
    app: file.name
  }))
], [])

const cardsRoute = async (req, res) => {

  const cards = await Promise.reduce(dashboardCards, async (cards, card) => [
    ...cards,
    ...!card.access || await card.access(req) ? [card] : []
  ], []).filter(card => {
    return _.includes(Object.keys(req.apps), card.app)
  }).filter(card => {
    return !card.rights || card.rights.reduce((permit, right) => {
      return !_.includes(req.rights, right) ? false : permit
    }, true)
  })

  cards.pagination = {
    all: cards.length,
    total: cards.length,
    limit: cards.length,
    skip: 0
  }

  res.status(200).respond(cards, (req, card) => ({
    type: card.code,
    title: card.title,
    description: card.description,
    app: card.app
  }))

}

export default cardsRoute
