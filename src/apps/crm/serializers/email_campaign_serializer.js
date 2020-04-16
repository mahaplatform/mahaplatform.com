const EmailCampaignSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  program: program(result.related('program')),
  subject: result.get('subject'),
  reply_to: result.get('reply_to'),
  to: result.get('to').criteria,
  recipients: result.get('recipients'),
  code: result.get('code'),
  type: 'email',
  direction: 'outbound',
  has_preview: result.get('has_preview'),
  preview: result.get('preview'),
  purpose: result.get('purpose'),
  status: result.get('status'),
  config: result.get('config'),
  send_at: result.get('send_at'),
  sent_at: result.get('sent_at'),
  open_rate: result.get('open_rate'),
  bounce_rate: result.get('bounce_rate'),
  click_rate: result.get('click_rate'),
  complaint_rate: result.get('complaint_rate'),
  unsubscribe_rate: result.get('unsubscribe_rate'),
  sent: result.get('sent'),
  delivered: result.get('delivered'),
  bounced: result.get('bounced'),
  opened: result.get('opened'),
  total_opened: result.get('total_opened'),
  last_opened_at: result.get('last_opened_at'),
  mobile: result.get('mobile'),
  desktop: result.get('desktop'),
  clicked: result.get('clicked'),
  total_clicked: result.get('total_clicked'),
  forwarded: result.get('forwarded'),
  shared: result.get('shared'),
  webviewed: result.get('webviewed'),
  complained: result.get('complained'),
  unsubscribed: result.get('unsubscribed'),
  deleted_at: result.get('deleted_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const program = (program) => {
  if(!program.id) return
  return {
    id: program.get('id'),
    title: program.get('title')
  }
}

export default EmailCampaignSerializer
