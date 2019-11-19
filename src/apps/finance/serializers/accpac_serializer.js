import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'

const accpaccSerializer = async (req, { batch, items }) => {

  const vendors = items.reduce((vendors, record) => {
    const key = _getVendorKey(record)
    return {
      ...vendors,
      [key]: [
        ...vendors[key] || [],
        record
      ]
    }
  }, {})

  const headers = [
    ['RECTYPE','CNTBTCH','CNTITEM','IDVEND','IDINVC','TEXTTRX','IDTRX','ORDRNBR','INVCDESC','DATEINVC','FISCYR','FISCPER','TERMCODE','DATEDUE','AMT1099','AMTGROSDST','AMTGROSTOT'],
    ['RECTYPE','CNTBTCH','CNTITEM','CNTLINE','TEXTDESC','IDGLACCT','AMTDIST','AMTDISTNET','COMMENT'],
    ['RECTYPE','CNTBTCH','CNTITEM','CNTPAYM','DATEDUE','AMTDUE']
  ]

  const invoices = Object.keys(vendors).reduce((invoices, key, invoiceIndex) => {

    const record = vendors[key][0]

    const vendor_id = _getVendorId(record)

    const lineItems = vendors[key].reduce((lineItems, lineItem, lineItemIndex) => {
      const newItems = [{
        index: 2,
        index2: 9999,
        invoiceIndex: invoiceIndex + 1,
        lineItemIndex: 20 * (lineItemIndex + 1),
        user: (lineItem.related('user').get('f_last') + (lineItem.get('vendor_id') ? ' - ' + lineItem.related('vendor').get('name').toLowerCase().trim() : '')),
        idglacct: idglacct(lineItem, lineItem.related('project'), lineItem.related('expense_type')),
        amount: numeral(lineItem.get('amount')).format('0.00'),
        amount2: numeral(lineItem.get('amount')).format('0.00'),
        desc: lineItem.get('description'),
        type: lineItem.get('type'),
        project_id: lineItem.get('project_id')
      }]
      if(lineItem.get('tax') && lineItem.get('tax') > 0) {
        newItems.push({
          index: 2,
          index2: 9999,
          invoiceIndex: invoiceIndex + 1,
          lineItemIndex: 20 * (lineItemIndex + 1),
          user: (lineItem.related('user').get('f_last') + (lineItem.get('vendor_id') ? ' - ' + lineItem.related('vendor').get('name').toLowerCase().trim() : '')),
          idglacct: idglacct(lineItem, lineItem.related('tax_project'), req.tax_expense_type),
          amount: numeral(lineItem.get('tax')).format('0.00'),
          amount2: numeral(lineItem.get('tax')).format('0.00'),
          desc: lineItem.get('description'),
          type: lineItem.get('type'),
          project_id: lineItem.get('tax_project_id')
        })
      }
      return [
        ...lineItems,
        ...newItems
      ]
    }, [])

    const lineItemsObj = lineItems.reduce((obj, item) => {

      const amount = obj.tripProjectTotals[item.project_id] ? (Number(obj.tripProjectTotals[item.project_id]) + Number(item.amount)) : Number(item.amount)

      return {
        tripProjectTotals: {
          ...obj.tripProjectTotals,
          ...(item.type === 'trip') ? { [item.project_id]: amount } : {}
        },
        tripsCombined: {
          ...obj.tripsCombined,
          ...(item.type === 'trip') ? { [item.project_id]: item } : {}
        },
        others: [
          ...obj.others,
          ...(item.type != 'trip' || !item.type) ? [item] : []
        ]
      }

    }, { tripProjectTotals: {}, tripsCombined: {}, others: [] })

    const tripTotalsLineItems = Object.values(lineItemsObj.tripsCombined).map((item, index) => {
      const project_id = Object.keys(lineItemsObj.tripsCombined)[index]
      const amount = numeral(lineItemsObj.tripProjectTotals[project_id]).format('0.00')
      return {
        ...item,
        desc:'Aggregate Mileage Expense for Project ' + project_id,
        amount,
        amount2: amount
      }
    })

    const finalLineItemsWithKeys = [...lineItemsObj.others, ...tripTotalsLineItems]

    const finalLineItem  = finalLineItemsWithKeys.reduce((obj, item) => {

      return [
        ...obj,
        Object.values(_.omit(item, ['type', 'project_id']))
      ]

    }, [])

    const total = finalLineItem.reduce((total, lineItem) => total + parseFloat(lineItem[6]), 0.00)

    const month = parseInt(moment(batch.get('date')).format('M'))

    const year = parseInt(moment(batch.get('date')).format('YYYY'))

    const startMonth = 10

    const fiscYear = (month >= startMonth) ? year + 1 : year

    const fiscPer = Math.ceil((month + (month >= startMonth ? 1 : 13) - startMonth) / 3)

    const invoice_title = record.get('batch_id')+'-' + key

    const getAccount = (record) => {
      const items = []
      if(record.get('account_number')) items.push(`Account ${record.get('account_number')}`)
      if(record.get('invoice_number')) items.push(`Invoice ${record.get('invoice_number')}`)
      return items.join(', ')
    }

    const invoice = [
      1,
      9999,
      invoiceIndex + 1,
      vendor_id,
      invoice_title,
      1,
      12,
      getAccount(record),
      'expenses',
      moment(batch.get('date')).format('YYYYMMDD'),
      fiscYear,
      fiscPer,
      'NET30',
      moment(batch.get('date')).add(30, 'days').format('YYYYMMDD'),
      0,
      numeral(total).format('0.00'),
      numeral(total).format('0.00')
    ]

    const schedule = [
      3,
      9999,
      invoiceIndex + 1,
      1,
      moment(batch.get('date')).add(30, 'days').format('YYYYMMDD'),
      numeral(total).format('0.00')
    ]

    return [
      ...invoices,
      invoice,
      ...finalLineItem,
      schedule
    ]

  }, headers)

  return invoices

}

const idglacct = (item, project, expense_type) => {
  if(!expense_type.id) return null
  if(!project.id) return null
  const expense_type_integration = expense_type.get('integration')
  const expense_code = expense_type_integration.expense_code
  const expense_type_source_code = expense_type_integration ? expense_type_integration.source_code : null
  const project_integration = project.get('integration')
  const project_code = project_integration.project_code
  const program_code = project_integration.program_code
  const source_code = expense_type_source_code || project_integration.source_code
  const match = project_integration.match
  return `${expense_code}-${program_code}-${source_code}-${match}-${project_code}`
}

const _getVendorKey = (record) => {
  if(record.get('type') === 'expense') return record.related('account').get('integration').vendor_id + '-' + record.related('user').get('values').vendor_id
  if(record.get('type') === 'check') return record.related('vendor').get('integration').vendor_id + '-' + record.related('user').get('values').vendor_id
  return record.related('user').get('values').vendor_id
}

const _getVendorId = (record) => {
  if(record.get('type') === 'expense') return record.related('account').get('integration').vendor_id
  if(record.get('type') === 'check') return record.related('vendor').get('integration').vendor_id
  return record.related('user').get('values').vendor_id
}

export default accpaccSerializer
