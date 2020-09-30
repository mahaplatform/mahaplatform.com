import { ModalPanel, Stack, Steps } from 'maha-admin'
import Inventory from './inventory'
import PropTypes from 'prop-types'
import Variants from './variants'
import Shipping from './shipping'
import Download from './download'
import Product from './product'
import Pricing from './pricing'
import Media from './media'
import React from 'react'
import URL from './url'

class Main extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object
  }

  state = {
    steps: [],
    step: -1,
    product: {},
    cards: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
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
    this.setState({
      steps: [
        { label: 'Details', component: Product, props: this._getProduct.bind(this) },
        { label: 'Variants', component: Variants, props: this._getVariants.bind(this) },
        { label: 'Photos', component: Media, props: this._getMedia.bind(this) },
        { label: 'Inventory', component: Inventory, props: this._getInventory.bind(this) },
        { label: 'Pricing', component: Pricing, props: this._getPricing.bind(this) },
        { label: 'Shipping', component: Shipping, props: this._getShipping.bind(this) }
      ],
      step: 0
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { product, steps, step } = this.state
    if(product.type !== prevState.product.type) {
      this._handleSteps()
    }
    if(step > prevState.step ) {
      this._handlePush(steps[step].component, steps[step].props)
    } else if(step < prevState.step ) {
      this._handlePop()
    }
  }

  _getDownload() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onNext: this._handleSave
    }
  }

  _getInventory() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onNext: this._handleNext
    }
  }

  _getMedia() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onNext: this._handleNext
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
      onChange: this._handleChange,
      onNext: this._handleNext
    }
  }

  _getPricing() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onNext: this._handleNext
    }
  }

  _getShipping() {
    const { product } = this.state
    return {
      product,
      onBack: this._handleBack,
      onNext: this._handleSave
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
    const { step, steps } = this.state
    return {
      completable: false,
      steps: steps.map(step => {
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
      onNext: this._handleNext
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

  _handleChange(product) {
    this.setState({ product })
  }

  _handleNext(data) {
    const { product, step } = this.state
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

  _handleSave(data) {
    const { store } = this.props
    const product = {
      ...this.state.product,
      ...data
    }
    this.context.network.request({
      endpoint: `/api/admin/stores/stores/${store.id}/products`,
      method: 'post',
      body: {
        title: product.title,
        description: product.description,
        variants: product.variants.map(varaint => ({
          is_active: varaint.is_active,
          options: varaint.options,
          photo_ids: varaint.photos.map(photo => photo.id),
          price_type: varaint.price_type,
          project_id: varaint.project_id,
          revenue_type_id: varaint.revenue_type_id,
          fixed_price: varaint.fixed_price,
          low_price: varaint.low_price,
          high_price: varaint.high_price,
          overage_strategy: varaint.overage_strategy,
          donation_revenue_type_id: varaint.donation_revenue_type_id,
          tax_rate: varaint.tax_rate,
          is_tax_deductible: varaint.is_tax_deductible,
          inventory_policy: varaint.inventory_policy,
          inventory_quantity: varaint.inventory_quantity,
          shipping_strategy: varaint.shipping_strategy,
          shipping_fee: varaint.shipping_fee,
          file_id: varaint.file ? varaint.file.id : null,
          url: varaint.url
        }))
      },
      onFailure: () => {},
      onSuccess: () => {}
    })
  }

  _handleSteps() {
    const { product, steps } = this.state
    this.setState({
      steps: steps.map((step, index) => {
        if(index !== 5) return step
        if(product.type === 'physical') {
          return { label: 'Shipping', component: Shipping, props: this._getShipping.bind(this) }
        } else if(product.type === 'file') {
          return { label: 'File', component: Download, props: this._getDownload.bind(this) }
        } else if(product.type === 'url') {
          return { label: 'URL', component: Download, props: this._getDownload.bind(this) }
        }
      })
    })
  }

}

export default Main
