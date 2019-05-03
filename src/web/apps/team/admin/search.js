import search from '../../../core/objects/search'
import User from '../../maha/models/user'

const Search = search({
  users: {
    fields: ['first_name','last_name','email'],
    model: User,
    serializer: result => ({
      text: result.get('full_name'),
      subtext: result.get('email'),
      route: `/admin/team/users/${result.get('id')}`,
      extra: {
        user: {
          full_name: result.get('full_name'),
          initials: result.get('initials'),
          photo: result.related('photo').get('path')
        }
      }
    }),
    withRelated: ['photo']
  }
})

export default Search
