const NodeClam = require('clamscan')

const clamscan = new NodeClam().init({
  clamdscan: {
    host: '127.0.0.1',
    port: 3310
  }
})

export default clamscan
