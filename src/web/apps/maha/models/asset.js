import Model from '../../../core/objects/model'
import s3 from '../../../core/services/s3'
import Source from './source'
import User from './user'

const Assets = new Model({

  tableName: 'maha_assets',

  virtuals: {

    extension: function() {
      return this.get('file_name').split('.').pop()
    },

    identifier: function() {
      return this.get('file_size')+'-'+this.get('original_file_name').replace(/[^0-9a-zA-Z_-]/img, '')
    },

    is_image: function() {
      return this.get('content_type').match(/image/) !== null
    },

    has_preview: function() {
      const is_pdf = this.get('content_type').match(/pdf/) !== null
      const is_doc = this.get('content_type').match(/msword/) !== null
      const is_xls = this.get('content_type').match(/excel/) !== null
      const is_openoffice = this.get('content_type').match(/officedocument/) !== null
      const is_email = this.get('content_type').match(/rfc822/) !== null
      const is_html = this.get('content_type').match(/html/) !== null
      return is_pdf || is_doc || is_xls || is_email || is_openoffice || is_html
    },

    key: function() {
      return (!this.isNew()) ? `assets/${this.get('id')}/${this.get('file_name')}` : null
    },

    path: function() {
      return (!this.isNew()) ? `/${this.get('key')}` : null
    },

    url: function() {
      const host = process.env.DATA_ASSET_CDN_HOST || process.env.DATA_ASSET_HOST || ''
      return (!this.isNew()) ? `${host}${this.get('path')}` : null
    },

    signed_url: function() {
      return s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_BUCKET,
        Key: `assets/${this.get('id')}/${this.get('file_name')}`,
        Expires: 60*60*24*7*2
      })
    }

  },

  source() {
    return this.belongsTo(Source, 'source_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Assets
