import PropTypes from 'prop-types'
import React from 'react'

class Itemstoapprove extends React.Component {

  static propTypes = {
    admin: PropTypes.object
  }

  render() {
    return (
      <div className="items-to-approve">
        <h3>Items to Approve:</h3>

      </div>
    )
  }

  componentDidMount() {

  }
}

export default Itemstoapprove
