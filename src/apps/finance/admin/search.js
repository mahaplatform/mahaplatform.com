import Project from '../models/project'

const Search = {
  projects: {
    fields: ['title'],
    model: Project,
    serializer: result => ({
      text: result.get('title'),
      route: `/admin/finance/projects/${result.get('id')}`
    })
  }
}

export default Search
