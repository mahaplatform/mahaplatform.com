import '../web/core/services/environment'
import knex from '../web/core/services/knex'
import Excel from 'exceljs'
import path from 'path'

const processor = async () => {

  var workbook = new Excel.Workbook()

  const filepath = path.join('projects.xlsx')

  await workbook.xlsx.readFile(filepath)

  const worksheet = workbook.getWorksheet('Sheet1')

  const data = []

  worksheet.eachRow((row, index) => {
    if(index === 1) return
    const rowData = []
    row.eachCell({ includeEmpty: true }, col => rowData.push(col.value))
    data.push(rowData)
  })

  const tax_projects = [91,52,66,134,139,151,153,155,157,173]

  const getTaxProjectId = (row) => {
    if(row[4] && row[4] === 'X') return tax_projects[0]
    if(row[5] && row[5] === 'X') return tax_projects[1]
    if(row[6] && row[6] === 'X') return tax_projects[2]
    if(row[7] && row[7] === 'X') return tax_projects[3]
    if(row[8] && row[8] === 'X') return tax_projects[4]
    if(row[9] && row[9] === 'X') return tax_projects[5]
    if(row[10] && row[10] === 'X') return tax_projects[6]
    if(row[11] && row[11] === 'X') return tax_projects[7]
    if(row[12] && row[12] === 'X') return tax_projects[8]
    if(row[13] && row[13] === 'X') return tax_projects[9]
    return null
  }

  await Promise.mapSeries(data, async (row, index) => {

    const tax_project_id = getTaxProjectId(row)

    if(tax_project_id == null) return

    await knex('expenses_projects').where({
      id: row[0]
    }).update({ tax_project_id })

  })

}

processor().then(process.exit)
