import { makePayment } from '@apps/finance/services/payments'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import LineItem from '@apps/finance/models/line_item'
import Invoice from '@apps/finance/models/invoice'
import moment from 'moment'

export const createInvoice = async (req, { program_id, contact, line_items }) => {

  const code = await generateCode(req, {
    table: 'finance_invoices'
  })

  const invoice = await Invoice.forge({
    team_id: req.team.get('id'),
    code,
    program_id,
    customer_id: contact.get('id'),
    date: moment(),
    due: moment()
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    subject: null,
    story: 'created',
    auditable: invoice
  })

  let delta = 0

  await Promise.mapSeries(line_items, async (line_item) => {
    if(line_item.price_type === 'fixed' || line_item.overage_strategy !== 'donation') {
      if(line_item.price > 0) {
        await LineItem.forge({
          team_id: req.team.get('id'),
          invoice_id: invoice.get('id'),
          project_id: line_item.project_id,
          revenue_type_id: line_item.revenue_type_id,
          is_tax_deductible: line_item.is_tax_deductible,
          description: line_item.description,
          tax_rate: line_item.tax_rate,
          quantity: line_item.quantity,
          price: line_item.price,
          delta
        }).save(null, {
          transacting: req.trx
        })
        delta = delta + 1
      }
    } else {
      if(Number(line_item.low_price) > 0) {
        await LineItem.forge({
          team_id: req.team.get('id'),
          invoice_id: invoice.get('id'),
          project_id: line_item.project_id,
          revenue_type_id: line_item.revenue_type_id,
          is_tax_deductible: line_item.is_tax_deductible,
          description: line_item.description,
          tax_rate: line_item.tax_rate,
          quantity: line_item.quantity,
          price: line_item.low_price,
          delta
        }).save(null, {
          transacting: req.trx
        })
        delta = delta + 1
      }
      if(line_item.overage_strategy === 'donation' && Number(line_item.price) > Number(line_item.low_price)) {
        await LineItem.forge({
          team_id: req.team.get('id'),
          invoice_id: invoice.get('id'),
          project_id: line_item.project_id,
          revenue_type_id: line_item.donation_revenue_type_id,
          is_tax_deductible: true,
          description: line_item.description+' (amount over base price)',
          tax_rate: line_item.tax_rate,
          quantity: line_item.quantity,
          price: line_item.price - line_item.low_price,
          delta
        }).save(null, {
          transacting: req.trx
        })
        delta = delta + 1
      }
    }
  })

  return invoice

}

export const handlePayment = async (req, params) => {

  const { invoice, program } = params

  await invoice.load(['customer'], {
    transacting: req.trx
  })

  const payment = await makePayment(req, {
    invoice,
    params: {
      bank_id: program.get('bank_id'),
      ...params.payment
    }
  })

  await audit(req, {
    contact: invoice.related('customer'),
    story: 'payment made',
    auditable: invoice
  })

  await audit(req, {
    contact: invoice.related('customer'),
    story: 'created',
    auditable: payment
  })

  return payment


}
