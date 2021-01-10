export const parseMessage = (msg, expand = true) => {

  const raw = msg.rawMessage.toString('hex').substr(52)

  return Buffer.from(raw, 'hex').toString('utf8')

}
