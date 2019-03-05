import { Rights } from 'maha'

const rights = new Rights([
  {
    code: 'manage_configuration',
    title: 'Manage Configuration',
    description: 'manage supervisors, competencies, and resources'
  }, {
    code: 'manage_plans',
    title: 'Manage Plans',
    description: 'manage their own plans'
  }
])

export default rights
