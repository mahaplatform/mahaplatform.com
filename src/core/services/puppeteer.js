import puppeteer from 'puppeteer'

export const generatePDF = async ({ html, css }) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  page.setContent(html)
  page.addStyleTag({ content: css })
  const data = await page.pdf({ format: 'A4' })
  await browser.close()
  return data
}
