import { Fixtures } from 'maha'

const projectsFixtures = new Fixtures({

  tableName: 'expenses_projects',

  records: {

    widget_prototype: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Widget Prototype',
      is_active: true,
      integration: {
        project_code: '1234',
        program_code: '123',
        source_code: '456',
        match: '78'
      }
    }),

    website_app: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Website / App Development',
      is_active: true,
      integration: {
        project_code: '5678',
        program_code: '123',
        source_code: '456',
        match: '78'
      }
    }),

    factory: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Factory Buildout',
      is_active: true,
      integration: {
        project_code: '9012',
        program_code: '123',
        source_code: '456',
        match: '78'
      }
    })

  }

})

export default projectsFixtures
