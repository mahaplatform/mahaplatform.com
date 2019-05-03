import Emitter from 'socket.io-emitter'

const emitter = Emitter(process.env.REDIS_URL)

export default emitter
