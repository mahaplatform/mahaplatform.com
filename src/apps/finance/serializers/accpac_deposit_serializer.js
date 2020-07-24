import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'

const idglacct = (allocation, revenue_code = null) => {
  const line_item = allocation.related('line_item')
  const project = line_item.related('project').get('integration')
  const revenue_type = line_item.related('revenue_type').get('integration')
  const parts = []
  parts.push(revenue_code || revenue_type.revenue_code)
  parts.push(project.program_code)
  parts.push(project.source_code)
  parts.push(project.match)
  parts.push(project.main_project_code)
  parts.push(project.project_code)
  parts.push('0000000')
  return parts.join('-')
}

const getMethod = (payment) => {
  if(_.includes(['card','applepay','googlepay'], payment.get('method'))) return 'CREDITCARD'
  if(payment.get('method') === 'paypal') return 'PAYPAL'
  if(payment.get('method') === 'ach') return 'ACH'
  if(payment.get('method') === 'check') return 'CHECK'
  if(payment.get('method') === 'cash') return 'CASH'
}

const getPayment = (allocation) => {
  if(allocation.get('payment_id')) return allocation.related('payment')
  if(allocation.get('refund_id')) return allocation.related('refund').related('payment')
}

const getIDRemit = (allocation) => {
  if(allocation.get('payment_id')) return `MH-PAYMENT-${allocation.get('payment_id')}`
  if(allocation.get('refund_id')) return `MH-REFUND-${allocation.get('refund_id')}`
}

const getFormatted = (allocation, key) => {
  if(allocation.get('payment_id')) return numeral(allocation.get(key)).format('0.00')
  if(allocation.get('refund_id')) return numeral(0 - allocation.get(key)).format('0.00')
}

const getSummary = (deposit, allocation, index) => {

  const date = moment(allocation.related('payment').get('date'))

  const deposit_date = moment(deposit.get('date'))

  const month = parseInt(moment(deposit.get('date')).format('M'))

  const year = parseInt(moment(deposit.get('date')).format('YYYY'))

  const startMonth = 10

  const fiscYear = (month >= startMonth) ? year + 1 : year

  const fiscPer = Math.ceil((month + (month >= startMonth ? 1 : 13) - startMonth) / 3)

  const payment = getPayment(allocation)

  const customer = payment.related('invoice').related('customer')


  return [
    1,
    'CA',
    deposit.get('id'),
    index + 1,
    getIDRemit(allocation),
    '',
    date.format('YYYYMMDD'),
    `MH-DEPOSIT-${deposit.get('id')}`,
    customer.get('display_name'),
    getFormatted(allocation, 'amount'),
    getFormatted(allocation, 'amount'),
    1,
    0,
    2,
    getFormatted(allocation, 'amount'),
    0,
    getMethod(payment),
    'USD',
    'SP',
    1,
    0,
    5,
    1,
    '',
    2,
    fiscYear,
    fiscPer,
    customer.get('display_name'),
    date.format('YYYYMMDD'),
    'SP',
    0,
    date.format('YYYYMMDD'),
    3,
    0,
    0,
    getFormatted(allocation, 'amount'),
    '',
    0,
    1,
    1,
    ...Array(11).fill(0),
    'AR',
    deposit.related('bank').get('integration').bank_code,
    'USD',
    '',
    0,
    0,
    0,
    1,
    '',
    0,
    ...Array(5).fill(''),
    ...Array(16).fill(0),
    getFormatted(allocation, 'amount'),
    '18272',
    index + 1,
    '',
    ...Array(2).fill(1),
    ...Array(2).fill(''),
    1,
    ...Array(10).fill(0),
    getFormatted(allocation, 'amount'),
    ...Array(12).fill(0),
    getFormatted(allocation, 'amount'),
    '62A',
    '',
    deposit_date.format('YYYYMMDD'),
    ...Array(2).fill(''),
    0,
    '',
    0,
    ''
  ]
}

const getLineItemDescription = (allocation, text) => {
  const payment = getPayment(allocation)
  const parts = [payment.related('invoice').related('customer').get('display_name')]
  parts.push(allocation.related('line_item').get('description'))
  if(text) parts.push(text)
  return parts.join(' - ')
}

const getAmount = (deposit, allocation, index) => {
  return [
    3,
    'CA',
    deposit.get('id'),
    index + 1,
    20,
    '',
    idglacct(allocation),
    '',
    getLineItemDescription(allocation),
    ...Array(26).fill(0),
    getFormatted(allocation, 'total'),
    getFormatted(allocation, 'total'),
    getFormatted(allocation, 'total'),
    getFormatted(allocation, 'total'),
    ...Array(19).fill(0),
    ...Array(4).fill(''),
    0
  ]
}

const getFee = (deposit, allocation, index) => [
  3,
  'CA',
  deposit.get('id'),
  index + 1,
  40,
  '',
  idglacct(allocation, 61110),
  '',
  getLineItemDescription(allocation, 'Processing Fee'),
  ...Array(26).fill(0),
  numeral(0 - allocation.get('fee')).format('0.00'),
  numeral(0 - allocation.get('fee')).format('0.00'),
  numeral(0 - allocation.get('fee')).format('0.00'),
  numeral(0 - allocation.get('fee')).format('0.00'),
  ...Array(19).fill(0),
  ...Array(4).fill(''),
  0
]

const accpaccDepositSerializer = async (req, { deposit, allocations }) => {

  const headers = [
    ['RECTYPE','CODEPYMTYP','CNTBTCH','CNTITEM','IDRMIT','IDCUST','DATERMIT','TEXTRMIT','TXTRMITREF','AMTRMIT','AMTRMITTC','RATEEXCHTC','SWRATETC','CNTPAYMETR','AMTPAYMTC','AMTDISCTC','CODEPAYM','CODECURN','RATETYPEHC','RATEEXCHHC','SWRATEHC','RMITTYPE','DOCTYPE','IDINVCMTCH','CNTLSTLINE','FISCYR','FISCPER','TEXTPAYOR','DATERATETC','RATETYPETC','AMTADJENT','DATERATEHC','PAYMTYPE','REMUNAPLTC','REMUNAPL','AMTRMITHC','DOCNBR','AMTADJHC','OPERBANK','OPERCUST','AMTDISCHC','AMTDBADJHC','AMTCRADJHC','AMTDBADJTC','AMTCRADJTC','SWJOB','APPLYMETH','ERRBATCH','ERRENTRY','VALUES','PROCESSCMD','SRCEAPPL','IDBANK','CODECURNBC','DRILLAPP','DRILLTYPE','DRILLDWNLK','SWPRINTED','SWTXAMTCTL','CODETAXGRP','TAXVERSION','CODETAX1','CODETAX2','CODETAX3','CODETAX4','CODETAX5','TAXCLASS1','TAXCLASS2','TAXCLASS3','TAXCLASS4','TAXCLASS5','TXBSE1TC','TXBSE2TC','TXBSE3TC','TXBSE4TC','TXBSE5TC','TXAMT1TC','TXAMT2TC','TXAMT3TC','TXAMT4TC','TXAMT5TC','TXTOTTC','AMTNETTC','DEPSEQ','DEPLINE','CODECURNRC','SWTXCTLRC','RATERC','RATETYPERC','RATEDATERC','RATEOPRC','SWRATERC','TXAMT1RC','TXAMT2RC','TXAMT3RC','TXAMT4RC','TXAMT5RC','TXTOTRC','CNTACC','AMTACCTC','AMTACCHC','AMTPAYMHC','REMUNAPLHC','TXBSE1HC','TXBSE2HC','TXBSE3HC','TXBSE4HC','TXBSE5HC','TXAMT1HC','TXAMT2HC','TXAMT3HC','TXAMT4HC','TXAMT5HC','TXTOTHC','AMTNETHC','ARVERSION','ENTEREDBY','DATEBUS','IDACCTSET','CCPREVID','CCPREVSTTS','CCTRANID','CCTRANSTTS','PROCESSCOD'],
    ['RECTYPE','CODEPAYM','CNTBTCH','CNTITEM','CNTLINE','DOCNBR','TEXTDESC','TEXTREF','AMTACCTC','AMTACCHC','IDCUST'],
    ['RECTYPE','CODEPAYM','CNTBTCH','CNTITEM','CNTLINE','IDDISTCODE','IDACCT','GLREF','GLDESC','TAXCLASS1','TAXCLASS2','TAXCLASS3','TAXCLASS4','TAXCLASS5','SWTAXINCL1','SWTAXINCL2','SWTAXINCL3','SWTAXINCL4','SWTAXINCL5','TXBSE1TC','TXBSE2TC','TXBSE3TC','TXBSE4TC','TXBSE5TC','RATETAX1','RATETAX2','RATETAX3','RATETAX4','RATETAX5','TXAMT1TC','TXAMT2TC','TXAMT3TC','TXAMT4TC','TXAMT5TC','TXTOTTC','AMTDISTTC','AMTNETTC','AMTDISTHC','AMTNETHC','AMTCOGS','ALTBASETAX','TXAMT1RC','TXAMT2RC','TXAMT3RC','TXAMT4RC','TXAMT5RC','TXTOTRC','TXBSE1HC','TXBSE2HC','TXBSE3HC','TXBSE4HC','TXBSE5HC','TXAMT1HC','TXAMT2HC','TXAMT3HC','TXAMT4HC','TXAMT5HC','TXTOTHC','CONTRACT','PROJECT','CATEGORY','RESOURCE','COSTCLASS','BILLDATE'],
    ['RECTYPE','CODEPAYM','CNTBTCH','CNTITEM','CNTLINE','IDCUST','IDINVC','CNTPAYM','TRXTYPE','PYMTRESL','AMTPAYM','AMTERNDISC','CNTLASTSEQ','AMTADJTOT','CNTADJ','TEXTADJ','GLREF','IDPPD','IDDOCMTCH','CDAPPLYTO','OBSPAYMAMT','OBSDISCAMT','OBSNETBAL','PNDPAYTOT','PNDDSCTOT','PNDADJTOT','AMTDBADJTC','AMTCRADJTC','DOCTYPE','SWJOB','AMTPAYMTOT','AMTDISCTOT','APPLYMETH','RTGTOTDBTC','RTGTOTCRTC','RTGAMT','RTGDATEDUE','RTGTERMS','SWRTGRATE','PROCESSCMD','UNAPLPAYM','UNAPLDISC','TRXTYPEID','RMITTYPE','SWRTG','RTGBAL','RTGAPPLYTO','AMTADJNET','EXCHRATEHC','DATEINVC','AMTPAYMHC','AMTDISCHC','AMTADJHC','RTGAMTHC','ARVERSION','CODECURN'],
    ['RECTYPE','CODEPAYM','CNTBTCH','CNTITEM','CNTLINE','CNTSEQ','CODTRXTYPE','AMTDIST','IDDISTCODE','IDACCT','CONTRACT','PROJECT','CATEGORY','RESOURCE','TRANSNBR','COSTCLASS','AMTDISC','AMTPAYM','IDITEM','UNITMEAS','QTYINVC','AMTCOST','BILLDATE','RTGAMT','RTGDATEDUE','SWRTG','AMTDISTHC','AMTDISCHC','AMTPAYMHC','RTGAMTHC','TEXTDESC','TEXTREF','DOCLINE','AMTDUETC']
  ]

  return allocations.reduce((revenues, allocation, index) => {

    return [
      ...revenues,
      getSummary(deposit, allocation, index),
      getAmount(deposit, allocation, index),
      ...allocation.get('fee') > 0 ? [getFee(deposit, allocation, index)] : []
    ]

  }, headers)

}

export default accpaccDepositSerializer
