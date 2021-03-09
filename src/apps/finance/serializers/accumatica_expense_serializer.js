import numeral from 'numeral'
import _ from 'lodash'

const subaccount = (item, project, expense_type) => {
  if(!expense_type.id) return null
  if(!project.id) return null
  const expense_type_integration = expense_type.get('integration')
  const expense_type_source_code = expense_type_integration ? expense_type_integration.source_code : null
  const project_integration = project.get('integration')
  const main_project_code = project_integration.main_project_code
  const project_code = project_integration.project_code
  const program_code = project_integration.program_code
  const source_code = expense_type_source_code || project_integration.source_code
  const match = project_integration.match
  return `${program_code}-${source_code}-${match}-${main_project_code}-${project_code}-0000000`
}

const _getVendorKey = (record) => {
  if(record.get('type') === 'expense') return record.related('account').get('integration').vendor_id + '-' + record.related('user').get('values').vendor_id
  if(record.get('type') === 'check') return record.related('vendor').get('integration').vendor_id + '-' + record.related('user').get('values').vendor_id
  return record.related('user').get('values').vendor_id
}

const desc = (lineItem) => {
  const vendor = lineItem.related('vendor')
  const user = lineItem.related('user')
  return (user.get('f_last') + (lineItem.get('vendor_id') ? ' - ' + vendor.get('name').toLowerCase().trim() : ''))
}

const accumaticaExpenseSerializer = async (req, { batch, items }) => {

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

  const invoices = Object.keys(vendors).reduce((invoices, key, invoiceIndex) => {

    const lineItems = vendors[key].reduce((lineItems, lineItem, lineItemIndex) => {
      const newItems = [{
        desc: desc(lineItem),
        quantity: '1.00',
        unit_cost: numeral(lineItem.get('amount')).format('0.0000'),
        ext_cost: numeral(lineItem.get('amount')).format('0.00'),
        amount: numeral(lineItem.get('amount')).format('0.00'),
        expense_code: lineItem.related('expense_type').get('integration').expense_code,
        subaccount: subaccount(lineItem, lineItem.related('project'), lineItem.related('expense_type')),
        type: lineItem.get('type'),
        project_id: lineItem.get('project_id'),
        project_code: lineItem.related('project').get('integration').project_code,
        user_id: lineItem.get('user_id'),
        user_name: lineItem.related('user').get('full_name')
      }]
      if(lineItem.get('tax') && lineItem.get('tax') > 0) {
        newItems.push({
          desc: desc(lineItem),
          quantity: '1.00',
          unit_cost: numeral(lineItem.get('tax')).format('0.0000'),
          ext_cost: numeral(lineItem.get('tax')).format('0.00'),
          amount: numeral(lineItem.get('tax')).format('0.00'),
          expense_code: req.tax_expense_type,
          subaccount: subaccount(lineItem, lineItem.related('tax_project'), req.tax_expense_type),
          type: lineItem.get('type'),
          project_id: lineItem.get('tax_project_id'),
          project_code: lineItem.related('project').get('integration').project_code,
          user_id: lineItem.get('user_id'),
          user_name: lineItem.related('user').get('full_name')
        })
      }
      return [
        ...lineItems,
        ...newItems
      ]
    }, [])

    const lineItemsObj = lineItems.reduce((obj, item) => {

      const total = _.get(obj, `tripProjectTotals.${item.project_id}.${item.user_id}`) || 0

      const amount = total + Number(item.amount)

      return {
        tripProjectTotals: {
          ...obj.tripProjectTotals,
          ...(item.type === 'trip') ? {
            [item.project_id]: {
              ...obj.tripsCombined[item.project_id] || {},
              [item.user_id]: amount
            }
          } : {}
        },
        tripsCombined: {
          ...obj.tripsCombined,
          ...(item.type === 'trip') ? {
            [item.project_id]: {
              ...obj.tripsCombined[item.project_id] || {},
              [item.user_id]: item
            }
          } : {}
        },
        others: [
          ...obj.others,
          ...(item.type != 'trip' || !item.type) ? [item] : []
        ]
      }

    }, { tripProjectTotals: {}, tripsCombined: {}, others: [] })

    const tripTotalsLineItems = Object.values(lineItemsObj.tripsCombined).reduce((items, pitems, pindex) => {
      const project_id = Object.keys(lineItemsObj.tripsCombined)[pindex]
      return [
        ...items,
        ...Object.values(pitems).map((item, index) => {
          const user_id = Object.keys(pitems)[index]
          const amount = numeral(lineItemsObj.tripProjectTotals[project_id][user_id])
          return {
            ...item,
            desc: `${item.user_name} - Aggregate Mileage Expense for Project ${item.project_code}`,
            unit_cost: amount.format('0.0000'),
            ext_cost: amount.format('0.00'),
            amount: amount.format('0.00')
          }
        })

      ]
    }, [])

    console.log(tripTotalsLineItems)

    const finalLineItemsWithKeys = [...lineItemsObj.others, ...tripTotalsLineItems]

    return [
      ...invoices,
      ...finalLineItemsWithKeys.reduce((obj, item) => [
        ...obj,
        Object.values(_.omit(item, ['type', 'project_id','project_code','user_id','user_name']))
      ], [])
    ]

  }, [[
    'Transaction Descr.',
    'Quantity',
    'Unit Cost',
    'Ext. Cost',
    'Amount',
    'Account',
    'Subaccount'
  ]])

  return invoices

}

export default accumaticaExpenseSerializer
