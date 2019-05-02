import { search } from 'maha'
import Attraction from '../models/attraction'

const Search = search({
  attractions: {
    fields: ['title'],
    model: Attraction,
    serializer: result => ({
      text: result.get('title'),
      route: `/admin/eatfresh/attractions/${result.get('id')}`,
      extra: {
        photo: result.related('photo').get('path')
      }
    }),
    withRelated: ['photo']
  }
})

export default Search
