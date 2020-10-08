import puppeteer from 'puppeteer'

export const generatePDF = async ({ html, css }) => {

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: process.env.NODE_ENV === 'development'
  })

  const page = await browser.newPage()

  await page.setContent(html, {
    waitUntil: 'networkidle0'
  })

  if(css) {
    page.addStyleTag({
      content: css
    })
  }

  const data = await page.pdf({
    format: 'A4'
  })

  await browser.close()

  return data
}
