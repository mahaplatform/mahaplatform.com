import db from '@core/services/db/db'

export default async (args) => {

  await db(args[0])

  process.exit()

}
