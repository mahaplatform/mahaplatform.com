import { exportInvoices } from '@apps/finance/services/invoices'
import Queue from '@core/objects/queue'

const ExportInvoicesQueue = new Queue({
  queue: 'worker',
  name: 'export_invoices',
  processor: exportInvoices
})

export default ExportInvoicesQueue
