import { getAssetData } from '../../apps/maha/services/asset'
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

    const iso8601 = value.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/) !== null

    // TODO: need to recognize and parse iso4601 ate formats from exceljs

    const sanitized = iso8601 ? value.substr(0, 10) : value

    return moment(sanitized, ['MM/DD/YYYY', 'MM/DD/YY', 'MM-DD-YYYY', 'MM-DD-YY', 'YYYY-MM-DD']).format('YYYY-MM-DD')

  } else if(key === 'Time Leaving' || key === 'Time Arriving'){

    return moment(value, ['h:m a', 'h:mm a', 'h:ma', 'h:mma', 'H:ma', 'H:mma', 'H:m a', 'H:mm a']).format('h:mm a')

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

        console.log(`row ${i}, col ${j}: `, parsed.headers[j - 1], cell.value, sanitizeData(parsed.headers[j - 1], cell.value))

        parsed.rows[index][j - 1] = sanitizeData(parsed.headers[j - 1], cell.value)

      }

    })

  })

  return parsed

}

export default parse
