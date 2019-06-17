import Resource from '../models/resource'

const Search = {
  resources: {
    fields: ['title','description'],
    model: Resource,
    serializer: result => ({
      text: result.get('title'),
      route: `/admin/competencies/resources/${result.get('id')}`
    })
  }
}

export default Search
