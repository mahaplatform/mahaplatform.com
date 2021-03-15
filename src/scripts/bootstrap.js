import bootstrap from '@core/services/bootstrap/bootstrap'

export default async() => {
  await bootstrap()
  process.exit()
}
