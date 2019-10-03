import '../core/services/environment'
import inspector from 'inspector'
import path from 'path'

inspector.open()

require(path.join('..','server'))

require(path.join('..','worker'))

require(path.join('..','cron'))
