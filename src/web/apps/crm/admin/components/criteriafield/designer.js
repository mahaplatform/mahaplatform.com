import ContactToken from '../../tokens/contact'
import { Message, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import Criteria from '../criteria'
import PropTypes from 'prop-types'
import React from 'react'

class Desginer extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    adding: PropTypes.bool,
    contacts: PropTypes.array,
    criteria: PropTypes.object,
    fields: PropTypes.array,
    onAdd: PropTypes.func,
    onEnd: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { contacts, criteria } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-criteriafield-designer">
          <div className="crm-criteriafield-designer-sidebar">
            <Criteria { ...this._getCriteria() } />
          </div>
          { criteria && contacts ?
            <div className="crm-criteriafield-designer-main">
              <div className="crm-criteriafield-designer-summary">
                Your criteria matches { contacts.length } contacts
              </div>
              <div className="crm-criteriafield-designer-results">
                { contacts && contacts.map((contact, index) => (
                  <div className="crm-criteriafield-designer-result" key={`contact_${index}`}>
                    <ContactToken { ...contact } />
                  </div>
                )) }
              </div>
            </div> :
            <Message { ...this._getEmpty() } />
          }
        </div>
      </ModalPanel>
    )
  }

  _getCriteria() {
    const { criteria } = this.props
    return {
      defaultValue: criteria,
      onChange: () => {}
    }
  }

  _getEmpty() {
    return {
      title: 'No Resuts',
      text: 'No contacts match your query',
      icon: 'user-circle'
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
    this.context.form.pop()
  }

}

const mapStateToProps = (state, props) => ({
  contacts: state.crm.criteriafield[props.cid].contacts,
  criteria: state.crm.criteriafield[props.cid].criteria
})

export default connect(mapStateToProps)(Desginer)
