import moment from 'moment'
import _ from 'lodash'

class Responder {

  req = null
  res = null
  errors = null
  pagination = null
  serializer = null
  data = null

  constructor(res, data, serializer) {
    this.res = res
    this.req = res.req
    this.pagination = data.pagination
    this.errors = data.errors
    this.data = data
    this.serializer = serializer
    this.filename = this._getFilename()
  }

  async render() {
    const serializer = this._getSerializer(this.serializer)
    this.data = await this._serializeData(this.data, serializer)
    const headers = await this._getHeaders()
    const data = await this._getData()
    Object.keys(headers).map(key => {
      this.res.header(key, headers[key])
    })
    if(this.req.query.download) {
      this.res.setHeader('Content-disposition', `attachment; filename=${this.filename}`)
    }
    this.res.setHeader('Cache-Control', 'max-age=0,no-cache')
    this.res.type(this.type).send(data)
  }

  _getHeaders() {
    return {}
  }

  _getSerializer(serializer) {
    if(_.isFunction(serializer)) return serializer
    if(_.isPlainObject(serializer)) {
      return (req, item) => serializer.fields.reduce((data, field) => ({
        ...data,
        [field]: item.get(field)
      }), {})
    }
    return (req, item) => item.toJSON ? item.toJSON() : item
  }

  async _serializeData(data, serializer) {
    delete data.pagination
    if(data.map === undefined) return await serializer(this.req, data)
    return await Promise.mapSeries(data, async (item, index) => {
      return await serializer(this.req, item, index)
    })
  }

  _getFilename() {
    const filename = this.req.query.filename || 'export'
    const datestamp = moment().format('YYYYMMDDHHmmss')
    return `${filename}-${datestamp}.${this.req.format}`
  }

  _getSelectedLabels(select, record) {
    if(_.isPlainObject(select)) return Object.keys(select)
    if(!_.isNil(select)) _.castArray(select)
    if(_.isArray(record)) return record
    return this._flattenKeys(record)
  }

  _getSelectedKeys(select, record) {
    if(_.isPlainObject(select)) return Object.values(select)
    if(!_.isNil(select)) _.castArray(select)
    if(_.isArray(record)) return Array(record.length).fill(0).map((i,j) => j)
    return this._flattenKeys(record)
  }

  _flattenKeys(hash, prefix = '') {
    return Object.keys(hash).reduce((keys, key) => [
      ...keys,
      ..._.isPlainObject(hash[key]) ? this._flattenKeys(hash[key], `${prefix}${key}.`) : [`${prefix}${key}`]
    ], [])
  }

}

export default Responder
