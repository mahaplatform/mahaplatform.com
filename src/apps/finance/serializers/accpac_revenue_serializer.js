import numeral from 'numeral'
import moment from 'moment'
import _ from 'lodash'

const idglacct = (allocation) => {
  const line_item = allocation.related('line_item')
  const project = line_item.related('project').get('integration')
  const revenue_type = line_item.related('revenue_type').get('integration')
  const parts = []
  parts.push(revenue_type.revenue_code)
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
}

const getSummary = (batch, allocation, index) => {

  const date = moment(allocation.related('payment').get('date'))

  const month = parseInt(moment(batch.get('date')).format('M'))

  const year = parseInt(moment(batch.get('date')).format('YYYY'))

  const startMonth = 10

  const fiscYear = (month >= startMonth) ? year + 1 : year

  const fiscPer = Math.ceil((month + (month >= startMonth ? 1 : 13) - startMonth) / 3)

  return [
    1,
    'CA',
    batch.get('id'),
    index + 1,
    `MH${batch.get('id')}`,
    '',
    date.format('YYYYMMDD'),
    allocation.related('line_item').get('description'),
    allocation.related('payment').related('invoice').related('customer').get('display_name'),
    numeral(allocation.get('amount')).format('0.00'),
    numeral(allocation.get('amount')).format('0.00'),
    1,
    0,
    2,
    numeral(allocation.get('amount')).format('0.00'),
    0,
    getMethod(allocation.related('payment')),
    'USD',
    'SP',
    1,
    0,
    5,
    1,
    allocation.related('payment').related('invoice').get('code'),
    2,
    fiscYear,
    fiscPer,
    allocation.related('payment').related('invoice').related('customer').get('display_name'),
    date.format('YYYYMMDD'),
    'SP',
    0,
    date.format('YYYYMMDD'),
    3,
    0,
    0,
    numeral(allocation.get('amount')).format('0.00'),
    'PY000040302',
    0,
    1,
    1,
    ...Array(11).fill(0),
    'AR',
    'B10010',
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
    numeral(allocation.get('amount')).format('0.00'),
    '18272',
    index + 1,
    '',
    ...Array(2).fill(1),
    ...Array(2).fill(''),
    1,
    ...Array(10).fill(0),
    numeral(allocation.get('amount')).format('0.00'),
    ...Array(12).fill(0),
    numeral(allocation.get('amount')).format('0.00'),
    '62A',
    'JMH37',
    date.format('YYYYMMDD'),
    ...Array(2).fill(''),
    0,
    '',
    0,
    ''
  ]
}

const getAmount = (batch, allocation, index) => {
  return [
    3,
    'CA',
    batch.get('id'),
    index + 1,
    20,
    '',
    idglacct(allocation),
    '',
    allocation.related('payment').related('invoice').related('customer').get('display_name'),
    ...Array(26).fill(0),
    numeral(allocation.get('total')).format('0.00'),
    numeral(allocation.get('total')).format('0.00'),
    numeral(allocation.get('total')).format('0.00'),
    numeral(allocation.get('total')).format('0.00'),
    ...Array(19).fill(0),
    ...Array(4).fill(''),
    0
  ]
}

const getFee = (batch, allocation, index) => {
  return [
    3,
    'CA',
    batch.get('id'),
    index + 1,
    40,
    '',
    idglacct(allocation),
    '',
    allocation.related('payment').related('invoice').related('customer').get('display_name'),
    ...Array(26).fill(0),
    numeral(0 - allocation.get('fee')).format('0.00'),
    numeral(0 - allocation.get('fee')).format('0.00'),
    numeral(0 - allocation.get('fee')).format('0.00'),
    numeral(0 - allocation.get('fee')).format('0.00'),
    ...Array(19).fill(0),
    ...Array(4).fill(''),
    0
  ]
}

const accpaccRevenueSerializer = async (req, { batch, allocations }) => {

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
      getSummary(batch, allocation, index),
      getAmount(batch, allocation, index),
      ...allocation.get('fee') > 0 ? [getFee(batch, allocation, index)] : []
    ]

  }, headers)

}

export default accpaccRevenueSerializer
