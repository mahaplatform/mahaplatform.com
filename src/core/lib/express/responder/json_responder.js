import Responder from './responder'

class JsonResponder extends Responder {

  type = 'application/json'

  _getHeaders() {
    return this.pagination ? {
      'pagination-all': this.pagination.all,
      'pagination-total': this.pagination.total,
      'pagination-limit': this.pagination.limit,
      'pagination-skip': this.pagination.skip
    } : {}
  }


  _getData() {
    return {
      data: this.data,
      pagination: this.pagination
    }
  }

}

export default JsonResponder
