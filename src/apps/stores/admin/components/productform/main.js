import { ModalPanel, Stack, Steps } from 'maha-admin'
import Inventory from './inventory'
import PropTypes from 'prop-types'
import Variants from './variants'
import Shipping from './shipping'
import Product from './product'
import Pricing from './pricing'
import Photos from './photos'
import React from 'react'
import File from './file'
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
        { label: 'Photos', component: Photos, props: this._getPhotos.bind(this) },
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

  _getFile() {
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

  _getPhotos() {
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
        { label: 'Cancel', handler: this._handleCancel }
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
        variants: product.variants.map(variant => ({
          is_active: variant.is_active,
          options: variant.options,
          photo_ids: variant.photos.map(photo => photo.id),
          price_type: variant.price_type,
          project_id: variant.project_id,
          revenue_type_id: variant.revenue_type_id,
          fixed_price: variant.fixed_price,
          low_price: variant.low_price,
          high_price: variant.high_price,
          overage_strategy: variant.overage_strategy,
          donation_revenue_type_id: variant.donation_revenue_type_id,
          tax_rate: variant.tax_rate,
          inventory_policy: variant.inventory_policy,
          inventory_quantity: variant.inventory_quantity,
          shipping_strategy: variant.shipping_strategy,
          shipping_fee: variant.shipping_fee,
          file_id: variant.file ? variant.file.id : null,
          url: variant.url
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
          return { label: 'File', component: File, props: this._getFile.bind(this) }
        } else if(product.type === 'url') {
          return { label: 'URL', component: URL, props: this._getFile.bind(this) }
        }
      })
    })
  }

}

export default Main
