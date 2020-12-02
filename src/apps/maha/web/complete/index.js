import Pasteur from 'pasteur'

class Complete {

  constructor() {
    this.pasteur = new Pasteur({
      window,
      target: window.parent,
      name: 'child',
      targetName: 'parent'
    })
    this.pasteur.send('complete')
  }

}

new Complete()
