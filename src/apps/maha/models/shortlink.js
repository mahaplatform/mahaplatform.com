import Model from '@core/objects/model'

const Shortlink = new Model({

  tableName: 'maha_shortlinks',

  rules: {},

  virtuals: {

    shortUrl() {
      return `${process.env.SHORTURL_HOST}/${this.get('code')}`
    }

  }

})

export default Shortlink
