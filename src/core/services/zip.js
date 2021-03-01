import Zip from 'adm-zip'

export const zip = async ({ files }) => {

  const zip = new Zip()

  files.map(file => {
    zip.addFile(file.name, file.data)
  })

  return await zip.toBuffer()

}
