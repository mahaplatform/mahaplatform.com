import { ModalPanel, Stack, Steps } from 'maha-admin'
import Inventory from './inventory'
import PropTypes from 'prop-types'
import Variants from './variants'
import Shipping from './shipping'
import Product from './product'
import Pricing from './pricing'
import Media from './media'
import React from 'react'

class ProductForm extends React.Component {

  static childContextTypes = {
    form: PropTypes.object
  }

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object
  }

  static defaultProps = {
  }

  steps = [
    { label: 'Details', component: Product, props: this._getProduct.bind(this) },
    { label: 'Variants', component: Variants, props: this._getVariants.bind(this) },
    { label: 'Photos', component: Media, props: this._getMedia.bind(this) },
    { label: 'Inventory', component: Inventory, props: this._getInventory.bind(this) },
    { label: 'Pricing', component: Pricing, props: this._getPricing.bind(this) },
    { label: 'Shipping', component: Shipping, props: this._getShipping.bind(this) }
  ]

  state = {
    step: 0,
    product: {},
    cards: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleNext = this._handleNext.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="stores-productform">
          <div className="stores-productform-header">
            <Steps { ...this._getSteps() } />
          </div>
          <div className="stores-productform-body">
            <Stack { ...this._getStack() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handlePush(Product, this._getProduct())
  }

  componentDidUpdate(prevProps, prevState) {
    const { step } = this.state
    if(step > prevState.step ) {
      this._handlePush(this.steps[step].component, this.steps[step].props)
    } else if(step < prevState.step ) {
      this._handlePop()
    }
  }

  getChildContext() {
    return {
      form: {
        push: this.context.modal.push,
        pop: this.context.modal.pop
      }
    }
  }

  _getInventory() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onDone: this._handleNext
    }
  }

  _getMedia() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onDone: this._handleNext
    }
  }

  _getPanel() {
    return {
      title: 'New Product',
      leftItems: [
        { label: 'Cancel' }
      ]
    }
  }

  _getProduct() {
    return {
      onCancel: this._handleCancel,
      onDone: this._handleNext
    }
  }

  _getPricing() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onDone: this._handleNext
    }
  }

  _getShipping() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onDone: this._handleNext
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getSteps() {
    const { step } = this.state
    return {
      completable: false,
      steps: this.steps.map(step => {
        return step.label
      }),
      current: step
    }
  }

  _getVariants() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onDone: this._handleNext
    }
  }

  _handleBack() {
    this.setState({
      step: this.state.step - 1
    })
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleNext(data) {
    const { product, step } = this.state
    console.log('next',step,data)
    this.setState({
      product: {
        ...product,
        ...data
      },
      step: step + 1
    })
  }

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleSave() {
    const { product } = this.state
    const value = {
      title: product.title,
      description: product.description,
      image_ids: product.description,
      variants: product.has_variants ? product.variants : [{
        title: 'base',
        options: [],
        price_type: product.price_type,
        project_id: product.project_id,
        revenue_type_id: product.revenue_type_id,
        fixed_price: product.fixed_price,
        low_price: product.low_price,
        high_price: product.high_price,
        overage_strategy: product.overage_strategy,
        donation_revenue_type_id: product.donation_revenue_type_id,
        tax_rate: product.tax_rate,
        is_tax_deductible: product.is_tax_deductible,
        inventory_quantity: product.inventory_quantity,
        inventory_policy: product.inventory_strategy,
        is_active: true
      }]
    }
    console.log('Save', value)
  }

}

export default ProductForm
