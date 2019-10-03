import Model from '../../../core/objects/model'
import member from './member'

const MemberType = new Model({

  tableName: 'expenses_member_types',

  rules: {
    name: ['required']
  },

  members() {
    return this.hasMany(member, 'member_type_id')
  }

})

export default MemberType
