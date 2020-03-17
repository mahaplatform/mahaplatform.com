import PropTypes from 'prop-types'
import React from 'react'

class Token extends React.Component {

  static propTypes = {
    strategy: PropTypes.string,
    variable: PropTypes.string,
    branches: PropTypes.array
  }

  render() {
    const { strategy, variable } = this.props
    return (
      <div>
        { strategy === 'variable' && variable &&
          <div>
            { variable.name }
          </div>
        }
      </div>
    )
  }

}

export default Token
