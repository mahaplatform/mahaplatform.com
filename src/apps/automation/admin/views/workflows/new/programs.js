import ProgramToken from '@apps/crm/admin/tokens/program'
import List from '@apps/crm/admin/components/list'
import { Infinite, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

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
    this.props.onChoose(program.id)
  }

}

class Programs extends React.PureComponent {

  static propTypes = {
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  _getInfinite() {
    const { onChoose } = this.props
    return {
      endpoint: '/api/admin/crm/programs',
      filter: {
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
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

}

export default Programs
