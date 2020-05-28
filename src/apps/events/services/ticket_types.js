import { whitelist } from '../../../core/services/routes/params'
import TicketType from '../models/ticket_type'

export const updateTicketTypes = async(req, { event, ticket_types }) => {

  await event.load(['ticket_types'], {
    transacting: req.trx
  })

  const existing = event.related('ticket_types')

  const add = ticket_types.filter(ticket_type => {
    return !ticket_type.id
  })

  const update = ticket_types.filter(ticket_type => {
    return ticket_type.id !== undefined
  })

  await Promise.mapSeries(add, async (data) => {
    await TicketType.forge({
      team_id: req.team.get('id'),
      event_id: event.get('id'),
      ...whitelist(data, ['name','description','project_id','revenue_type_id','price_type','fixed_price','low_price','high_price','tax_rate','is_tax_deductible','overage_strategy','donation_revenue_type_id','total_tickets','max_per_order','sales_open_at','sales_close_at'])
    }).save(null, {
      transacting: req.trx
    })
  })

  await Promise.mapSeries(update, async (data) => {

    const ticket_type = existing.find(ticket_type => {
      return ticket_type.get('id') === data.id
    })

    await ticket_type.save({
      sales_open_at: data.sales_open_at,
      sales_close_at: data.sales_close_at,
      ...whitelist(data, ['name','description','project_id','revenue_type_id','price_type','fixed_price','low_price','high_price','tax_rate','is_tax_deductible','overage_strategy','donation_revenue_type_id','total_tickets','max_per_order'])
    }, {
      transacting: req.trx,
      patch: true
    })

  })

}
