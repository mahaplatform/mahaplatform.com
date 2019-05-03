import Fixtures from '../../../../core/objects/fixtures'

const rightsFixtures = new Fixtures({

  tableName: 'maha_rights',

  records: {

    competencies_manage_configuration: (data) => ({
      app_id: data.maha_apps.competencies.id,
      text: 'MANAGE CONFIGURATION',
      description: 'manage supervisors, competencies, and resources'
    }),

    competencies_manage_plans: (data) => ({
      app_id: data.maha_apps.competencies.id,
      text: 'MANAGE PLANS',
      description: 'manage their own plans'
    })

  }

})

export default rightsFixtures
