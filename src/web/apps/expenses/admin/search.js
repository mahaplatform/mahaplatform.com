import search from '../../../core/objects/search'
import Project from '../models/project'

const Search = search({
  projects: {
    fields: ['title'],
    model: Project,
    serializer: result => ({
      text: result.get('title'),
      route: `/admin/expenses/projects/${result.get('id')}`
    })
  }
})

export default Search
