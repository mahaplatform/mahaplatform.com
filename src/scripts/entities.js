import '../web/core/services/environment'
import inspector from 'inspector'
import path from 'path'

inspector.open()

require(path.join('..','web','socket'))

require(path.join('..','web','server'))

require(path.join('..','web','worker'))

require(path.join('..','web','cron'))
