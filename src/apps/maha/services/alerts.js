import SendAlertQueue from '../queues/send_alert_queue'

export const sendAlert = async (req, account, code, data) => {
  await SendAlertQueue.enqueue(req, {
    account_id: account.get('id'),
    code,
    data
  })
}
