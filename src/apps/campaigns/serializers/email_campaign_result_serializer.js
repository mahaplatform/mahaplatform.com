const EmailCampaignResultSerializer = (req, result) => ({
  open_rate: result.get('open_rate'),
  bounce_rate: result.get('bounce_rate'),
  click_rate: result.get('click_rate'),
  complaint_rate: result.get('complaint_rate'),
  unsubscribe_rate: result.get('unsubscribe_rate'),
  sent: result.get('sent'),
  delivered: result.get('delivered'),
  bounced: result.get('bounced'),
  hard_bounced: result.get('hard_bounced'),
  soft_bounced: result.get('soft_bounced'),
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
  unsubscribed: result.get('unsubscribed')
})

export default EmailCampaignResultSerializer
