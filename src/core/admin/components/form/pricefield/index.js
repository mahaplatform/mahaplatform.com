import PropTypes from 'prop-types'
import Field from '../field'
import React from 'react'
import _ from 'lodash'

class PriceField extends React.PureComponent {

  static propTypes = {
    free: PropTypes.bool,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  static defaultProps = {
    free: false,
    tabIndex: 0,
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    donation_revenue_type_id: null,
    errors: {},
    fixed_price: null,
    high_price: null,
    is_tax_deductable: false,
    low_price: null,
    overage_strategy: null,
    price_type: null,
    project_id: null,
    revenue_type_id: null,
    tax_rate: null
  }

  _handleOverageStrategy = this._handleOverageStrategy.bind(this)
  _handlePriceType = this._handlePriceType.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { overage_strategy, price_type } = this.state
    const notfree = _.includes(['fixed','sliding_scale'], price_type)
    return (
      <div className="maha-form-segment">
        <Field { ...this._getPriceType() } />
        { notfree &&
          <div className="maha-form-field field">
            <div className="maha-form-field-control">
              <div className="two fields">
                <Field { ...this._getProjectId() } />
                <Field { ...this._getRevenueTypeId() } />
              </div>
            </div>
          </div>
        }
        { price_type === 'fixed' &&
          <Field { ...this._getFixedPrice() } />
        }
        { price_type === 'sliding_scale' &&
          <div className="maha-form-field field">
            <div className="maha-form-field-control">
              <div className="two fields">
                <Field { ...this._getLowPrice() } />
                <Field { ...this._getHighPrice() } />
              </div>
            </div>
          </div>
        }
        { price_type === 'sliding_scale' &&
          <Field { ...this._getOverageStrategy() } />
        }
        { overage_strategy === 'donation' &&
          <Field { ...this._getDonationRevenueTypeId() } />
        }
        { notfree &&
          <Field { ...this._getTaxRate() } />
        }
        { notfree &&
          <Field { ...this._getIsTaxDeductable() } />
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    if(!_.isEqual(this.state, prevState)) {
      this._handleChange()
    }
  }

  _getDonationRevenueTypeId() {
    const { errors, donation_revenue_type_id } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        label: 'Revenue Type',
        name: 'donation_revenue_type_id',
        type: 'lookup',
        placeholder: 'Choose a Revenue Type',
        endpoint: '/api/admin/finance/revenue_types',
        // format: RevenueTypeToken,
        value: 'id',
        text: 'title',
        defaultValue: donation_revenue_type_id
      },
      errors,
      tabIndex: tabIndex + 0.3,
      onUpdateData: this._handleUpdate
    }
  }

  _getFixedPrice() {
    const { errors, fixed_price } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        label: 'Fixed Price',
        name: 'fixed_price',
        type: 'moneyfield',
        required: true,
        defaultValue: fixed_price
      },
      errors,
      tabIndex: tabIndex + 0.4,
      onUpdateData: this._handleUpdate
    }
  }

  _getHighPrice() {
    const { errors, high_price } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        label: 'High Price',
        name: 'high_price',
        type: 'moneyfield',
        required: true,
        defaultValue: high_price
      },
      errors,
      tabIndex: tabIndex + 0.4,
      onUpdateData: this._handleUpdate
    }
  }

  _getIsTaxDeductable() {
    const { errors, is_tax_deductable } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        label: 'Tax Deductable?',
        name: 'is_tax_deductable',
        type: 'checkbox',
        prompt: 'Is this product tax deductable?',
        defaultValue: is_tax_deductable
      },
      errors,
      tabIndex: tabIndex + 0.4,
      onUpdateData: this._handleUpdate
    }
  }

  _getLowPrice() {
    const { errors, low_price } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        label: 'Low Price',
        name: 'low_price',
        type: 'moneyfield',
        required: true,
        defaultValue: low_price
      },
      errors,
      tabIndex: tabIndex + 0.4,
      onUpdateData: this._handleUpdate
    }
  }

  _getOverageStrategy() {
    const { errors, overage_strategy } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        label: 'Overage Strategy',
        name: 'overage_strategy',
        type: 'dropdown',
        options: [
          { value: 'income', text: 'Treat any amount over the low price as additional income' },
          { value: 'donation', text: 'Treat any amount over the low price as a donation' }
        ],
        required: true,
        defaultValue: overage_strategy
      },
      errors,
      tabIndex: tabIndex + 0.8,
      onUpdateData: this._handleOverageStrategy
    }
  }

  _getPriceType() {
    const { errors, price_type } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        name: 'price_type',
        type: 'dropdown',
        options: [
          { value: 'fixed', text: 'Fixed Price' },
          { value: 'sliding_scale', text: 'Sliding Scale' },
          { value: 'free', text: 'Free'}
        ],
        required: true,
        defaultValue: price_type
      },
      errors,
      tabIndex: tabIndex + 0.1,
      onUpdateData: this._handlePriceType
    }
  }

  _getProjectId() {
    const { errors, project_id } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        label: 'Project',
        name: 'project_id',
        type: 'lookup',
        placeholder: 'Choose a Project',
        endpoint: '/api/admin/finance/memberships',
        // format: ProjectToken,
        value: 'id',
        text: 'title',
        defaultValue: project_id
      },
      errors,
      tabIndex: tabIndex + 0.2,
      onUpdateData: this._handleUpdate
    }
  }

  _getRevenueTypeId() {
    const { errors, revenue_type_id } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        label: 'Revenue Type',
        name: 'revenue_type_id',
        type: 'lookup',
        placeholder: 'Choose a Project',
        endpoint: '/api/admin/finance/revenue_types',
        // format: RevenueTypeToken,
        value: 'id',
        text: 'title',
        defaultValue: revenue_type_id
      },
      errors,
      tabIndex: tabIndex + 0.3,
      onUpdateData: this._handleUpdate
    }
  }

  _getTaxRate() {
    const { errors, tax_rate } = this.state
    const { tabIndex } = this.props
    return {
      field: {
        label: 'Tax Rate',
        name: 'tax_rate',
        type: 'numberfield',
        required: true,
        defaultValue: tax_rate
      },
      errors,
      tabIndex: tabIndex + 0.4,
      onUpdateData: this._handleUpdate
    }
  }

  _handleChange() {
    const { donation_revenue_type_id, fixed_price, high_price } = this.state
    const { is_tax_deductable, low_price, overage_strategy } = this.state
    const { price_type, project_id, revenue_type_id, tax_rate } = this.state
    this.props.onChange({
      donation_revenue_type_id,
      fixed_price,
      high_price,
      is_tax_deductable,
      low_price,
      overage_strategy,
      price_type,
      project_id,
      revenue_type_id,
      tax_rate
    })
  }

  _handleOverageStrategy(key, value) {
    const { errors } = this.state
    this.setState({
      donation_revenue_type_id: null,
      errors: _.omit(errors, key),
      overage_strategy: value
    })
  }

  _handlePriceType(key, value) {
    const { errors } = this.state
    this.setState({
      donation_revenue_type_id: null,
      errors: _.omit(errors, key),
      fixed_price: null,
      high_price: null,
      low_price: null,
      overage_strategy: null,
      price_type: value
    })
  }

  _handleUpdate(key, value) {
    const { errors } = this.state
    this.setState({
      [key]: value,
      errors: _.omit(errors, key)
    })
  }

  _handleValidate() {
    const { donation_revenue_type_id, fixed_price, high_price } = this.state
    const { is_tax_deductable, low_price, overage_strategy } = this.state
    const { price_type, project_id, revenue_type_id, tax_rate } = this.state
    const { onValid } = this.props
    const notfree = _.includes(['fixed','sliding_scale'], price_type)
    const errors = {}
    if(!price_type) {
      errors.price_type = ['This field is required']
    }
    if(notfree && project_id === null) {
      errors.project_id = ['This field is required']
    }
    if(notfree && revenue_type_id === null) {
      errors.revenue_type_id = ['This field is required']
    }
    if(price_type === 'fixed' && fixed_price === null) {
      errors.fixed_price = ['This field is required']
    }
    if(price_type === 'sliding_scale' && low_price === null) {
      errors.low_price = ['This field is required']
    }
    if(price_type === 'sliding_scale' && high_price === null) {
      errors.high_price = ['This field is required']
    }
    if(price_type === 'sliding_scale' && overage_strategy === null) {
      errors.overage_strategy = ['This field is required']
    }
    if(notfree && tax_rate === null) {
      errors.tax_rate = ['This field is required']
    }
    if(Object.keys(errors).length > 0) {
      this.setState({ errors })
      return onValid(null, [])
    }
    onValid({
      donation_revenue_type_id,
      fixed_price,
      high_price,
      is_tax_deductable,
      low_price,
      overage_strategy,
      price_type,
      project_id,
      revenue_type_id,
      tax_rate
    })
  }

}

export default PriceField
