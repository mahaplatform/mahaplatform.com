import Responder from './responder'
import _ from 'lodash'
import xml from 'xml'

class XmlResponder extends Responder {

  type =  'application/xml'

  _getData() {
    const data = _.castArray(this.data).map(record => ({
      record: this._toXML(record)
    }))
    const pagination = this.pagination ? Object.keys(this.pagination).map(key => ({
      [key]: this.pagination[key]
    })) : null
    return xml({
      response: [{ data }, { pagination }]
    }, true)
  }

  _toXML = (hash) => Object.keys(hash).map(key => ({
    [key]: _.isPlainObject(hash[key]) ? this._toXML(hash[key]) : hash[key]
  }))

}

export default XmlResponder
