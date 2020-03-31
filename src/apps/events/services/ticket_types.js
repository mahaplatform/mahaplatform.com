import { whitelist } from '../../../core/services/routes/params'
import TicketType from '../models/ticket_type'

export const updateTicketTypes = async(req, { ticket_types }) => {
  await Promise.mapSeries(ticket_types, async (ticket_type) => {
    await TicketType.forge({
      team_id: req.team.get('id'),
      event_id: event.get('id'),
      ...whitelist(ticket_type, ['name','project_id','revenue_type_id','price_type','fixed_price','low_price','high_price','overage_strategy','donation_revenue_type_id','total_tickets','max_per_order','sales_open_at','sales_close_at'])
    }).save(null, {
      transacting: req.trx
    })
  })
}
