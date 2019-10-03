import { is_starred } from './selectors'
import { connect } from 'react-redux'
import * as actions from './actions'
import PropTypes from 'prop-types'
import React from 'react'

class Starred extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    is_starred: PropTypes.bool,
    table: PropTypes.string,
    id: PropTypes.number,
    onUnstar: PropTypes.func
  }

  state = {
    show: false
  }

  _handleUnstar = this._handleUnstar.bind(this)

  render() {
    const { is_starred } = this.props
    if(!is_starred) return null
    return (
      <div className="maha-starred" onClick={ this._handleUnstar }>
        <i className="fa fa-fw fa-star" />
      </div>
    )
  }

  _handleUnstar() {
    const { table, id, onUnstar } = this.props
    onUnstar(table, id)
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/${table}/${id}/star`,
      onFailure: (result) => {},
      onSuccess: (result) => {}
    })

  }

}

const mapStateToProps = (state, props) => ({
  is_starred: is_starred(state, props)
})

export default connect(mapStateToProps, actions)(Starred)
