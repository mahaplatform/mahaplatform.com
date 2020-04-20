import { makePayment } from '../../../finance/services/payments'
import generateCode from '../../../../core/utils/generate_code'
import LineItem from '../../../finance/models/line_item'
import Invoice from '../../../finance/models/invoice'
import moment from 'moment'

const createInvoice = async (req, { program_id, contact, line_items }) => {

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

  await Promise.mapSeries(line_items, async (line_item) => {
    const base_price = line_item.low_price || line_item.fixed_price
    await LineItem.forge({
      team_id: req.team.get('id'),
      invoice_id: invoice.get('id'),
      product_id: line_item.product_id,
      project_id: line_item.project_id,
      donation_revenue_type_id: line_item.donation_revenue_type_id,
      revenue_type_id: line_item.revenue_type_id,
      is_tax_deductible: line_item.is_tax_deductible,
      description: line_item.description,
      tax_rate: line_item.tax_rate,
      base_price,
      donation: line_item.donation_revenue_type_id ? (line_item.price - base_price) : 0.00,
      quantity: line_item.quantity,
      price: line_item.price
    }).save(null, {
      transacting: req.trx
    })
  })

  return invoice

}

export const handlePayment = async (req, { program, contact, line_items, payment }) => {

  const invoice = await createInvoice(req, {
    program_id: program.get('id'),
    contact,
    line_items
  })

  if(payment) {
    await makePayment(req, {
      invoice,
      params: {
        merchant_id: program.get('merchant_id'),
        ...payment
      }
    })
  }

  return invoice

}
