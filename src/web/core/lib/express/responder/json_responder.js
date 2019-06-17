import Responder from './responder'

class JsonResponder extends Responder {

  type = 'application/json'

  _getData() {
    return {
      data: this.data,
      pagination: this.pagination
    }
  }

}

export default JsonResponder
