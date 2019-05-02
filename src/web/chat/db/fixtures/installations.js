import { Fixtures } from 'maha'

const installationsFixtures = new Fixtures({

  tableName: 'maha_installations',

  records: {

    acme_chat_installation: (data) => ({
      team_id: data.maha_teams.acme.id,
      app_id: data.maha_apps.chat.id,
      settings: {}
    }),

    soylent_chat_installation: (data) => ({
      team_id: data.maha_teams.soylent.id,
      app_id: data.maha_apps.chat.id,
      settings: {}
    })

  }

})

export default installationsFixtures
