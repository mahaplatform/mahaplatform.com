import { makePayment } from '../../../finance/services/payments'
import generateCode from '../../../../core/utils/generate_code'
import LineItem from '../../../finance/models/line_item'
import Invoice from '../../../finance/models/invoice'
import Product from '../../../finance/models/product'
import moment from 'moment'
import _ from 'lodash'

const getProductData = async(req, { product_id }) => {

  if(!product_id) return {}

  const product = await Product.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', product_id)
  }).fetch({
    transacting: req.trx
  })

  return {
    product_id: product.get('id'),
    project_id: product.get('project_id'),
    donation_revenue_type_id: product.get('donation_revenue_type_id'),
    revenue_type_id: product.get('revenue_type_id'),
    is_tax_deductible: product.get('is_tax_deductible'),
    description: product.get('title')
  }

}

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

    const productData = await getProductData(req, {
      product_id: line_item.product_id
    })

    await LineItem.forge({
      team_id: req.team.get('id'),
      invoice_id: invoice.get('id'),
      ...productData,
      ..._.omit(line_item, ['title','total'])
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
