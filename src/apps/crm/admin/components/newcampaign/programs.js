import { Infinite, ModalPanel } from 'maha-admin'
import ProgramToken from '../../tokens/program'
import PropTypes from 'prop-types'
import List from '../list'
import React from 'react'
import _ from 'lodash'

class Items extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return <List { ...this._getList() } />
  }

  _getList() {
    const { records } = this.props
    return {
      format: ProgramToken,
      items: records,
      handler: this._handleChoose
    }
  }

  _handleChoose(program) {
    this.props.onChoose(program)
  }

}

class Programs extends React.PureComponent {

  static propTypes = {
    type: PropTypes.string,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  _getInfinite() {
    const { type, onChoose } = this.props
    return {
      endpoint: '/api/admin/crm/programs',
      filter: {
        ..._.includes(['sms','voice'], type) ? {
          phone_number_id: {
            $nnl: true
          }
        }: {},
        access_type: {
          $in: ['manage','edit']
        }
      },
      layout: Items,
      props: {
        onChoose
      }
    }
  }

  _getPanel() {
    return {
      title: 'Choose a Progam',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel}
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

}

export default Programs
