import { Infinite } from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Program extends React.Component {

  static propTypes = {
    onCancel: PropTypes.func,
    onNext: PropTypes.func
  }

  form = null

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return <Infinite { ...this._getInfinite() } />
  }

  _getInfinite() {
    return {
      endpoint: '/api/admin/crm/programs',
      filter: {
        access_type: {
          $neq: 'view'
        }
      },
      layout: Results,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _handleChoose(program) {
    this.props.onNext({ program })
  }

}

export default Program
