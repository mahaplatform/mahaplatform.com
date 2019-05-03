import Rights from '../../../core/objects/rights'

const rights = new Rights([
  {
    code: 'manage_configuration',
    title: 'Manage Configuration',
    description: 'manage categories, classifiations, competencies, and resources'
  }, {
    code: 'manage_plans',
    title: 'Manage Plans',
    description: 'manage their own plans'
  }
])

export default rights
