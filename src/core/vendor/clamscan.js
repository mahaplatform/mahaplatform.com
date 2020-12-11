const NodeClam = require('clamscan')

const clamscan = process.env.NODE_ENV === 'production' ? new NodeClam().init({
  clamdscan: {
    host: '127.0.0.1',
    port: 3310
  }
}) : {
  is_infected: () => ({
    is_infected: false,
    viruses: []
  })
}

export default clamscan
