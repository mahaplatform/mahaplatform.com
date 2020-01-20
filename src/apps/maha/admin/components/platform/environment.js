import React from 'react'

class Environment extends React.Component {

  render() {
    if(process.env.ENVIRONMENT_WARNING !== true) return null
    return (
      <div className="maha-platform-environment">
        <strong>ATTENTION:</strong>
        This is a staging server for testing purposes only!
      </div>
    )
  }

}

export default Environment
