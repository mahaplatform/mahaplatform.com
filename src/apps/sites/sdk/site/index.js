import Request from './request'

class Site {

  site_id = null

  constructor(config) {
    this.request = new Request()
    this.site_id = config.site_id
  }

  async getItems({ type_id }) {
    const result = await this.request.get({
      path: `/api/sites/sites/${this.site_id}/types/${type_id}/items`
    })
    return result
  }

  async getItem({ type_id, item_id }) {
    const result = await this.request.get({
      path: `/api/sites/sites/${this.site_id}/types/${type_id}/items/${item_id}`
    })
    return result
  }

}

export default Site
