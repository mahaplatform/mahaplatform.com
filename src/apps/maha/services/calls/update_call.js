import socket from '../../../../core/services/routes/emitter'

const updateCall = async (req, { call, status }) => {

  if(call.get('status') === status) return

  await call.save({
    status
  }, {
    patch: true,
    transacting: req.trx
  })

  await call.load([], {
    transacting: req.trx
  })

  await socket.message(req, {
    channel: `/admin/calls/${call.get('id')}`,
    target: `/admin/calls/${call.get('id')}`,
    action: 'status',
    data: {
      id: call.get('id'),
      sid: call.get('sid'),
      status: call.get('status')
    }
  })

}

export default updateCall
