import { Resources } from '../backframe'

class MahaResources {

  constructor(options) {

    return new Resources({
      ...options,
      dependents: [
        { relationship: 'activities', strategy: 'destroy' },
        { relationship: 'audit', strategy: 'destroy' },
        { relationship: 'comments', strategy: 'destroy' },
        { relationship: 'listenings', strategy: 'destroy' },
        ...options.dependents || []
      ]
    })

  }

}

export default MahaResources
