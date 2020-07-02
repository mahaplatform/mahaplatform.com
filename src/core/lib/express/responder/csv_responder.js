import Responder from './responder'
import moment from 'moment'
import _ from 'lodash'

class CsvResponder extends Responder {

  type = 'text/plain'

  _getData() {
    const separator = this._getSeparator()
    const enclosure = this._getEnclosure()
    const records = _.castArray(this.data)
    const matrix = (_.isPlainObject(records[0])) ? this._toMatrix(records) : records
    const wrapped = matrix.map(row => row.map(col => this._wrapWithEnclosure(col, enclosure)))
    return wrapped.map(row => row.join(separator)).join('\r\n')
  }

  _getSeparator() {
    const { separator } = this.req.query || {}
    if(this.req.format === 'tsv') return '\t'
    if(separator && separator === 'tab') return '\t'
    return separator || ','
  }

  _getEnclosure() {
    return this.req.query.enclosure || ''
  }

  _toMatrix(records) {
    const labels = this._getSelectedLabels(this.req.query.$select, records[0])
    const keys = this._getSelectedKeys(this.req.query.$select, records[0])
    return records.reduce((output, record) => [
      ...output,
      keys.map(key => {
        const value = _.get(record, key)
        if(_.isDate(value))  return moment(value).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
        return value
      })
    ], [ labels ])
  }

  _wrapWithEnclosure(value, enclosure) {
    return enclosure + value + enclosure
  }

}

export default CsvResponder
