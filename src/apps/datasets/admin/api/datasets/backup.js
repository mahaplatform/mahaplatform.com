const backupRoute = async (req, res) => {

  const filename = 'backup.zip'

  res.setHeader('Content-disposition', `attachment; filename=${filename}`)

  res.type('application/zip').send('')

}

export default backupRoute
