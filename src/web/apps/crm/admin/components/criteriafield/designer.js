import { Infinite, Message, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import Criteria from '../criteria'
import PropTypes from 'prop-types'
import Contacts from './contacts'
import React from 'react'
import _ from 'lodash'

class Desginer extends React.Component {

  static contextTypes = {}

  static propTypes = {
    adding: PropTypes.bool,
    contacts: PropTypes.array,
    criteria: PropTypes.object,
    fields: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onEnd: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)

  state = {
    cacheKey: _.random(100000000, 999999999).toString(36)
  }

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-criteriafield-designer">
          <div className="crm-criteriafield-designer-sidebar">
            <Criteria { ...this._getCriteria() } />
          </div>
          <div className="crm-criteriafield-designer-main">
            <div className="crm-criteriafield-designer-results">
              <Infinite { ...this._getInfinite() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidUpdate(prevProps) {
    const { criteria } = this.props
    if(!_.isEqual(criteria, prevProps.criteria)) {
      this.setState({
        cacheKey: _.random(100000000, 999999999).toString(36)
      })
    }
  }

  _getCriteria() {
    const { criteria, fields, onChange } = this.props
    return {
      defaultValue: criteria,
      fields,
      onChange
    }
  }

  _getEmpty() {
    return {
      title: 'No Resuts',
      text: 'No contacts match your query',
      icon: 'user-circle'
    }
  }

  _getInfinite() {
    return {
      cacheKey: this.state.cacheKey,
      endpoint: '/api/admin/crm/contacts',
      filter: this.props.criteria,
      layout: (props) => <Contacts {...props}  />
    }
  }

  _getNew() {
    const { fields } = this.props
    return {
      fields
    }
  }

  _getItem(criteria) {
    const { onAdd, onRemove, onUpdate } = this.props
    return {
      criteria,
      onAdd,
      onRemove,
      onUpdate
    }

  }

  _getPanel() {
    return {
      title: 'Design Criteria',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel.bind(this) }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleCancel.bind(this) }
      ]
    }
  }

  _handleNew() {
    this.props.onAdd()
  }

  _handleCancel() {
    this.props.onEnd()
  }

}

const mapStateToProps = (state, props) => ({
  criteria: state.crm.criteriafield[props.cid].criteria
})

export default connect(mapStateToProps)(Desginer)
