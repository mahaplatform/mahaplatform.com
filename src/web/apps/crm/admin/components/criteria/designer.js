import { CSSTransition } from 'react-transition-group'
import ContactToken from '../../tokens/contact'
import { Message, ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'
import New from './new'

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
    const { adding, contacts, criteria } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-criteria-designer">
          <div className="crm-criteria-designer-sidebar">
            <div className="crm-criteria-designer-items">
              <div className="crm-criteria-items">
                { criteria && Object.keys(criteria).length > 0 &&
                  <Item { ...this._getItem(criteria) } />
                }
                { !criteria &&
                  <div className="ui tiny button" onClick={ this._handleNew }>
                    <i className="fa fa-plus" />
                  </div>
                }
              </div>
            </div>
            <CSSTransition in={ adding } classNames="expanded" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
              <New { ...this._getNew() } />
            </CSSTransition>
          </div>
          { criteria && contacts ?
            <div className="crm-criteria-designer-main">
              <div className="crm-criteria-designer-summary">
                Your criteria matches { contacts.length } contacts
              </div>
              <div className="crm-criteria-designer-results">
                { contacts && contacts.map((contact, index) => (
                  <div className="crm-criteria-designer-result" key={`contact_${index}`}>
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
    this.props.onEnd()
    this.context.form.pop()
  }

}

const mapStateToProps = (state, props) => ({
  adding: state.crm.criteria.adding,
  contacts: state.crm.criteria.contacts,
  criteria: state.crm.criteria.criteria
})

export default connect(mapStateToProps)(Desginer)
