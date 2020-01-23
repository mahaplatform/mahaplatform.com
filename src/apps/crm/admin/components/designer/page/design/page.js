import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

class Page extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    components: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  render() {
    const { components } = this.props
    const Component = components.page
    return <Component { ...this._getComponent() } />
  }

  _getComponent() {
    const { config, onPop, onPush } = this.props
    return {
      config,
      onPop,
      onPush,
      onUpdate: this._handleUpdate.bind(this, 'page')
    }
  }

  _handleUpdate(key, value) {
    this.props.onUpdate(key, value)
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer[props.cid].config.page
})

export default connect(mapStateToProps)(Page)
