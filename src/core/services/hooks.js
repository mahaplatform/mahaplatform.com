import collectObjects from '@core/utils/collect_objects'

const hooks = {
  'sms-receive': collectObjects('hooks/sms/receive.js'),
  'sms-status': collectObjects('hooks/sms/status.js'),
  'sms-optin': collectObjects('hooks/sms/optin.js'),
  'sms-optout': collectObjects('hooks/sms/optout.js'),
  'voice-receive': collectObjects('hooks/voice/receive.js'),
  'voice-status': collectObjects('hooks/voice/status.js')
}

export const executeHooks = async (req, key, params) => {
  await Promise.mapSeries(hooks[key], async (hook) => {
    await hook.default(req, params)
  })
}
