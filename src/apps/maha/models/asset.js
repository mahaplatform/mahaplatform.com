import Model from '@core/objects/model'
import s3 from '@core/services/s3'
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
      return this.get('content_type').match(/(jpeg|jpg|gif|png)/) !== null
    },

    has_preview: function() {
      const is_pdf = this.get('content_type').match(/pdf/) !== null
      const is_doc = this.get('content_type').match(/msword/) !== null
      const is_xls = this.get('content_type').match(/excel/) !== null
      const is_openoffice = this.get('content_type').match(/officedocument/) !== null
      const is_email = this.get('content_type').match(/rfc822/) !== null
      const is_html = this.get('content_type').match(/html/) !== null
      const is_rtf = this.get('content_type').match(/rtf/) !== null
      const is_txt = this.get('content_type').match(/text/) !== null
      return is_pdf || is_doc || is_xls || is_email || is_openoffice || is_html || is_rtf || is_txt
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
        Key: this.get('key'),
        Expires: 60*60*24*7
      })
    }

  },

  listener_ids(trx) {
    return User.query(qb => {
      qb.select('maha_users.id')
      qb.joinRaw('left join maha_comments on maha_comments.user_id=maha_users.id and maha_comments.commentable_type=? and maha_comments.commentable_id=?', ['maha_assets', this.get('id')])
      qb.whereRaw('maha_comments.id is not null')
      qb.groupBy('maha_users.id')
    }).fetchAll({
      transacting: trx
    }).then(users => users.map(user => user.get('id')))
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Assets
