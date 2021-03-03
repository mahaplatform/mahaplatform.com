import pdf from 'html-pdf'

export const generatePDF = async ({ html, css }) => {

  const data = await new Promise((resolve, reject) => {
    pdf.create(html, {
      format: 'A4',
      phantomArgs: [
        '--ignore-ssl-errors=yes'
      ]
    }).toBuffer((err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })

  return data

}
