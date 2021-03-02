import '@core/services/environment'
import path from 'path'

require(path.join('..','server'))

require(path.join('..','collector'))

require(path.join('..','analytics'))

require(path.join('..','worker'))

require(path.join('..','twilio'))

require(path.join('..','cron'))
