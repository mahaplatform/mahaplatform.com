import { Fixtures } from 'maha'

const membersFixtures = new Fixtures({

  tableName: 'expenses_members',

  records: {

    gracie_bechtelar_widget_prototype: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.widget_prototype.id,
      user_id: data.maha_users.gracie_bechtelar.id,
      member_type_id: data.expenses_member_types.owner.id,
      is_active: true
    }),

    jarvis_dicki_widget_prototype: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.widget_prototype.id,
      user_id: data.maha_users.jarvis_dicki.id,
      member_type_id: data.expenses_member_types.owner.id,
      is_active: true
    }),

    muhammad_kling_widget_prototype: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.widget_prototype.id,
      user_id: data.maha_users.muhammad_kling.id,
      member_type_id: data.expenses_member_types.member.id,
      is_active: true
    }),

    eleanora_kozey_widget_prototype: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.widget_prototype.id,
      user_id: data.maha_users.eleanora_kozey.id,
      member_type_id: data.expenses_member_types.member.id,
      is_active: true
    }),

    toney_marvin_widget_prototype: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.widget_prototype.id,
      user_id: data.maha_users.toney_marvin.id,
      member_type_id: data.expenses_member_types.member.id,
      is_active: true
    }),

    lauren_baker_website_app: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.website_app.id,
      user_id: data.maha_users.lauren_baker.id,
      member_type_id: data.expenses_member_types.owner.id,
      is_active: true
    }),

    kacey_boyle_website_app: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.website_app.id,
      user_id: data.maha_users.kacey_boyle.id,
      member_type_id: data.expenses_member_types.member.id,
      is_active: true
    }),

    blair_schmidt_website_app: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.website_app.id,
      user_id: data.maha_users.blair_schmidt.id,
      member_type_id: data.expenses_member_types.member.id,
      is_active: true
    }),

    lauren_baker_factory: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.factory.id,
      user_id: data.maha_users.lauren_baker.id,
      member_type_id: data.expenses_member_types.owner.id,
      is_active: true
    }),

    kacey_boyle_factory: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.factory.id,
      user_id: data.maha_users.kacey_boyle.id,
      member_type_id: data.expenses_member_types.member.id,
      is_active: true
    }),

    blair_schmidt_factory: (data) => ({
      team_id: data.maha_teams.acme.id,
      project_id: data.expenses_projects.factory.id,
      user_id: data.maha_users.blair_schmidt.id,
      member_type_id: data.expenses_member_types.member.id,
      is_active: true
    })

  }

})

export default membersFixtures
