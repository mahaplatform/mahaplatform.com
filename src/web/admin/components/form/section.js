import React from 'react'
import PropTypes from 'prop-types'
import Field from './field'

class Section extends React.Component {

  static propTypes = {
    collapsing: PropTypes.bool,
    collapsed: PropTypes.bool,
    data: PropTypes.object,
    errors: PropTypes.object,
    fields: PropTypes.array,
    instructions: PropTypes.any,
    label: PropTypes.string,
    tabIndexStart: PropTypes.number,
    onBusy: PropTypes.func,
    onReady: PropTypes.func,
    onUpdateData: PropTypes.func
  }

  static defaultProps = {
    collapsing: false
  }

  constructor(props) {
    super(props)
    const collapsed = (props.collapsed !== null) ? props.collapsed : props.collapsing
    this.state = { collapsed }
  }

  render() {
    const { collapsing, fields, instructions, label } = this.props
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
        </div>
      </div>
    )
  }

  _getClass() {
    const { collapsing } = this.props
    const { collapsed } = this.state
    let classes = ['maha-form-section']
    if(collapsing) classes.push('collapsing')
    if(collapsing) classes.push(collapsed ? 'collapsed' : 'expanded')
    return classes.join(' ')
  }

  _getField(field, index) {
    const { data, errors, tabIndexStart, onBusy, onReady, onUpdateData } = this.props
    return {
      field,
      data,
      errors,
      tabIndex: tabIndexStart + index,
      onBusy,
      onReady,
      onUpdateData
    }
  }

  _handleToggle() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

}

export default Section
