const EmailResultSerializer = (req, result) => ({
  sent: result.get('sent'),
  delivered: result.get('delivered'),
  bounced: result.get('bounced'),
  opened: result.get('opened'),
  desktop: result.get('desktop'),
  mobile: result.get('mobile'),
  complained: result.get('complained'),
  clicked: result.get('clicked'),
  unsubscribed: result.get('unsubscribed')
})

export default EmailResultSerializer
