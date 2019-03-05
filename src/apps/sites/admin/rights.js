import { Rights } from  'maha'

const rights = new Rights([
  {
    code: 'manage_sites',
    title: 'Manage Sites',
    description: 'Can create sites'
  }, {
    code: 'manage_content',
    title: 'Manage Content',
    description: 'Can manage site content'
  }
])

export default rights
