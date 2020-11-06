import { Infinite } from '@admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class ProgramChooser extends React.Component {

  static propTypes = {
    requires: PropTypes.array,
    onChoose: PropTypes.func
  }

  static defaultProps = {
    requires: []
  }

  form = null

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return <Infinite { ...this._getInfinite() } />
  }

  _getInfinite() {
    const { requires } = this.props
    return {
      endpoint: '/api/admin/crm/programs',
      filter: {
        access_type: {
          $neq: 'view'
        }
      },
      layout: Results,
      props: {
        requires,
        onChoose: this._handleChoose
      }
    }
  }

  _handleChoose(program) {
    this.props.onChoose(program)
  }

}

export default ProgramChooser
