import Excel from 'exceljs'
import path from 'path'

const EmployeeTypes = {

  up: async (knex) => {

    await knex.schema.table('maha_user_types', (table) => {
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
    })

    await knex('maha_user_types').update({
      team_id: 1
    })

    var workbook = new Excel.Workbook()

    const filepath = path.join(__dirname,'..','employee_types.xlsx')

    await workbook.xlsx.readFile(filepath)

    const worksheet = workbook.getWorksheet('Sheet1')

    const data = []

    worksheet.eachRow((row, index) => {
      if(index === 1) return
      const rowData = []
      row.eachCell({ includeEmpty: true }, col => rowData.push(col.value))
      data.push(rowData)
    })

    const board = await knex('maha_user_types').insert({
      team_id: 1,
      text: 'Board Member'
    }).returning('id')

    await Promise.mapSeries(data, async (row, index) => {

      const getEmployeeType = (row) => {
        if(row[4] !== null) return 1
        if(row[5] !== null) return 2
        if(row[6] !== null) return 3
        if(row[7] !== null) return board[0]
        return null
      }

      await knex('maha_users').where({
        id: row[0]
      }).update({
        user_type_id: getEmployeeType(row)
      })

    })

    const group = await knex('maha_users_groups').where({
      group_id: 15
    }).whereNot('user_id', 132)

    await Promise.mapSeries(group, async (member, index) => {

      await knex('maha_users').where({
        id: member.user_id
      }).update({
        user_type_id: board[0]
      })

    })

  },

  down: async (knex) => {
  }

}

export default EmployeeTypes
