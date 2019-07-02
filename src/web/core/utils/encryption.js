import crypto from 'crypto'

export const encrypt = (text, key) => {
  var cipher = crypto.createCipheriv('aes-256-ctr', key, process.env.CIPHER_IV)
  var crypted = cipher.update(text,'utf8','hex') + cipher.final('hex')
  return crypted
}

export const decrypt = (text, key) => {
  var decipher = crypto.createDecipheriv('aes-256-ctr', key, process.env.CIPHER_IV)
  var dec = decipher.update(text,'hex','utf8') + decipher.final('utf8')
  return dec
}
