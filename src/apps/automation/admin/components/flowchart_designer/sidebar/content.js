import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Types from './types'
import React from 'react'

class Content extends React.Component {

  static propTypes = {
    blocks: PropTypes.array,
    changes: PropTypes.number,
    cid: PropTypes.string,
    config: PropTypes.object,
    status: PropTypes.string,
    versions: PropTypes.array
  }
  
  render() {
    return <Types { ...this._getTypes() } />
  }

  _getTypes() {
    const { blocks } = this.props
    return {
      blocks,
      onCancel: () => {},
      onChoose: () => {}
    }
  }

}

const mapStateToProps = (state, props) => ({
  changes: state.automation.flowchart_designer[props.cid].changes,
  config: state.automation.flowchart_designer[props.cid].config
})

export default connect(mapStateToProps)(Content)
