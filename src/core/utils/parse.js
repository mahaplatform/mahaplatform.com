import { getAssetData } from '../../apps/maha/services/assets'
import csvparse from 'csv-parse/lib/sync'
import moment from 'moment'
import Excel from 'exceljs'
import _ from 'lodash'

const parse = async ({ asset, quote, delimiter, headers }) => {
  if(asset.get('extension') === 'xlsx') return await parseExcel(asset, quote, delimiter, headers)
  return await parseCsv(asset, quote, delimiter, headers)
}

const parseCsv = async(asset, quote, delimiter, includesHeaders) => {
  const data = await getAssetData(asset, 'string')
  const parsed = csvparse(data, {
    delimiter,
    quote
  })
  const rows = includesHeaders ? parsed.slice(1) : parsed
  const headers = includesHeaders ? parsed[0] : [...Array(parsed[0].length).keys()]
  return {
    headers,
    rows: rows.map(row => {
      return row.map((cell, index) => sanitizeData(headers[index], cell))
    })
  }
}

const sanitizeData = (key, untrimmed) => {
  const value = _.isPlainObject(untrimmed) ? _.trim(untrimmed.text) : _.trim(untrimmed)
  if(key === 'Date') {
    return moment(value).format('YYYY-MM-DD')
  } else if(key === 'Time Leaving' || key === 'Time Arriving'){
    return moment(value).utc().format('h:mm a')
  } else {
    return value
  }
}

const parseExcel = async (asset, quote, delimiter, headers) => {
  const data = await getAssetData(asset, 'stream')
  const excel = new Excel.Workbook()
  const workbook = await excel.xlsx.read(data)
  const worksheet = workbook.getWorksheet(1)
  const parsed = { headers: [], rows: [] }
  worksheet.eachRow((row, i) => {
    row.eachCell((cell, j) => {
      if(i === 1) {
        parsed.headers[j - 1] = headers ? cell.value : j - 1
      }
      if(!headers || i > 1) {
        const index = headers ? i - 2 : i - 1
        if(!parsed.rows[index]) parsed.rows[index] = []
        parsed.rows[index][j - 1] = sanitizeData(parsed.headers[j - 1], cell.value)
      }
    })
  })
  return parsed
}

export default parse
