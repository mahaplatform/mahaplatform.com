import webshot from 'webshot'

export const getScreenshot = async({ config, html }) => {
  return await new Promise((resolve, reject) => {
    const ws = webshot(html, {
      siteType:'html',
      streamType: 'jpg',
      defaultWhiteBackground: true,
      shotSize: {
        width: 'window',
        height: 'all'
      },
      ...config || {}
    })
    const buffer = []
    ws.on('data', data => buffer.push(data))
    ws.on('error', err => reject(new Error(err)))
    ws.on('end', () => resolve(Buffer.concat(buffer)))
  })
}
