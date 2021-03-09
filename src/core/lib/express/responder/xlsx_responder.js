import Responder from './responder'
import tempfile from 'tempfile'
import Excel from 'exceljs'
import _ from 'lodash'
import fs from 'fs'

class XlsxResponder extends Responder {

  type = 'application/vnd.ms-excel'

  async _getData() {
    const records = _.castArray(this.data)
    const labels = this._getSelectedLabels(this.req.query.$select, records[0])
    const keys = this._getSelectedKeys(this.req.query.$select, records[0])
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('test')
    worksheet.addRow(labels)
    records.map((record, index) => {
      if(index === 0) return
      return worksheet.addRow(keys.map(key => {
        return _.get(record, key)
      }))
    })
    const tempFilePath = tempfile('.xlsx')
    await workbook.xlsx.writeFile(tempFilePath)
    return fs.readFileSync(tempFilePath)
  }

}

export default XlsxResponder
