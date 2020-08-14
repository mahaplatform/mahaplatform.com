class Emitter {

  listeners = []

  on(event, handler) {
    this.listeners.push({
      event,
      handler
    })
  }

  emit(event) {
    this.listeners.filter(listener => {
      return listener.event === event
    }).map(listener => {
      listener.handler()
    })
  }

}

export default Emitter
