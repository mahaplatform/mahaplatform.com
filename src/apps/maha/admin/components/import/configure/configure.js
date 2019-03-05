import { ModalPanel, RadioGroup, TextField } from 'maha-admin'
import StrategyToken from './strategy_token'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Configure extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.object,
    primaryKey: PropTypes.string,
    name: PropTypes.string,
    strategy: PropTypes.string,
    import: PropTypes.object,
    onBack: PropTypes.func,
    onInit: PropTypes.func,
    onDone: PropTypes.func,
    onUpdateName: PropTypes.func,
    onUpdateImport: PropTypes.func,
    onUpdateStrategy: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleNameChange = this._handleNameChange.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handleStrategyChange = this._handleStrategyChange.bind(this)

  render() {
    const { primaryKey } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-config">
          <div className="import-config-row">
            <div className="import-config-label">
              Name
            </div>
            <div className="import-config-value">
              <TextField { ...this._getName() } />
            </div>
          </div>
          { primaryKey != null &&
            <div className="import-config-row">
              <div className="import-config-label">
                How should we handle duplicate records?
              </div>
              <div className="import-config-value">
                <RadioGroup { ...this._getStrategy() } />
              </div>
            </div>
          }
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    //set strategy to ignore in reducer;
    const { defaultValue, onInit } = this.props
    onInit(defaultValue)
  }

  componentDidUpdate(prevProps) {
    if(!_.isEqual(this.props.import, prevProps.import) && prevProps.import !== null && this.props.import !== null) {
      if(this.props.import.stage !== 'parsing') return
      this.props.onDone(this.props.import)
    }
  }

  _getPanel() {
    return {
      title: 'Configure Import',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { label: 'Next', handler: this._handleNext }
      ]
    }
  }

  _getName() {
    const { name } = this.props
    return {
      defaultValue: name,
      placeholder: 'Enter an optional name for this import',
      onChange: this._handleNameChange
    }
  }

  _getStrategy() {
    const { strategy } = this.props
    return {
      defaultValue: strategy,
      format: StrategyToken,
      onChange: this._handleStrategyChange,
      options: [
        {
          value: 'ignore',
          title: 'Ignore',
          text: 'Ignore duplicate records'
        },{
          value: 'overwrite',
          title: 'Merge & Overwrite',
          text: 'Merge duplicates, overwriting existing fields with data from import'
        },{
          value: 'discard',
          title: 'Merge & Discard',
          text: 'Merge duplicates, discarding data that conflicts with existing fields'
        }
      ]
    }
  }

  _handleNameChange(name) {
    this.props.onUpdateName( name )
  }

  _handleStrategyChange(strategy) {
    this.props.onUpdateStrategy( strategy )
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleNext() {
    const stage = 'parsing'
    const { name, strategy } = this.props
    this.props.onUpdateImport(this.props.import.id, {
      stage,
      name,
      strategy
    })
  }

}

export default Configure
