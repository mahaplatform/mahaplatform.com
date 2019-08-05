import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import Criteria from '../../criteria'
import Infinite from '../../infinite'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'
import _ from 'lodash'

class Desginer extends React.Component {

  static contextTypes = {}

  static propTypes = {
    adding: PropTypes.bool,
    contacts: PropTypes.array,
    criteria: PropTypes.object,
    endpoint: PropTypes.string,
    format: PropTypes.any,
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
        <div className="maha-criteriafield-designer">
          <div className="maha-criteriafield-designer-sidebar">
            <Criteria { ...this._getCriteria() } />
          </div>
          <div className="maha-criteriafield-designer-main">
            <Infinite { ...this._getInfinite() } />
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
    const { endpoint } = this.props
    return {
      cacheKey: this.state.cacheKey,
      endpoint,
      filter: this.props.criteria,
      layout: (props) => <Results { ...this._getResults(props) }  />
    }
  }

  _getResults(props) {
    const { format } = this.props
    return {
      ...props,
      format
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
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleCancel }
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
  criteria: state.maha.criteriafield[props.cid].criteria
})

export default connect(mapStateToProps)(Desginer)
