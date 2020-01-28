import React from 'react'
import PropTypes from 'prop-types'
import Field from './field'

class Section extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    section: PropTypes.object,
    status: PropTypes.string,
    tabIndexStart: PropTypes.number,
    onBusy: PropTypes.func,
    onReady: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdateData: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    collapsing: false
  }

  constructor(props) {
    super(props)
    const collapsed = (props.section.collapsed !== null) ? props.section.collapsed : props.section.collapsing
    this.state = { collapsed }
  }

  render() {
    const { section } = this.props
    const { collapsing, fields, instructions, label, after } = section
    const { collapsed } = this.state
    return (
      <div className={ this._getClass() }>
        { label &&
          <div className="maha-form-section-header" onClick={ this._handleToggle.bind(this)} >
            { collapsing && collapsed &&
              <i className="fa fa-fw fa-caret-right" />
            }
            { collapsing && !collapsed &&
              <i className="fa fa-fw fa-caret-down" />
            }
            { label }
          </div>
        }
        <div className="maha-form-section-body">
          { instructions &&
             <div className="maha-form-section-instructions">
               { instructions }
             </div>
          }
          { fields.map((field, index) => (
            <Field key={`field_${field.name || index}`} {...this._getField(field, index) } />
          ))}
          { after }
        </div>
      </div>
    )
  }

  _getClass() {
    const { section } = this.props
    const { collapsing } = section
    const { collapsed } = this.state
    let classes = ['maha-form-section']
    if(collapsing) classes.push('collapsing')
    if(collapsing) classes.push(collapsed ? 'collapsed' : 'expanded')
    return classes.join(' ')
  }

  _getField(field, index) {
    const { data, errors, status, tabIndexStart, onBusy, onReady, onSubmit, onUpdateData, onValid } = this.props
    return {
      field,
      data,
      errors,
      status,
      tabIndex: tabIndexStart + index,
      onBusy,
      onReady,
      onSubmit,
      onUpdateData,
      onValid
    }
  }

  _handleToggle() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

}

export default Section
