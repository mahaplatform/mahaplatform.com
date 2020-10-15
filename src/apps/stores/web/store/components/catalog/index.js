import PropTypes from 'prop-types'
import Item from './item'
import React from 'react'

class Catalog extends React.Component {

  static propTypes = {
    products: PropTypes.array,
    store: PropTypes.object
  }

  render() {
    // const products = [
    //   { id: 1, title: 'Tulip Couleur Cardinal', variants: [
    //     { code: 'abc', fixed_price: 7.50, inventory_quantity: 6, media: [
    //       { path: 'https://cdn.shopify.com/s/files/1/1419/7120/products/sq2Tulip_Coleur_Cardinal.SHUT_1024x.jpg?v=1571439571' }
    //     ] }
    //   ] },
    //   { id: 2, title: 'Tulip Paul Scherer', variants: [
    //     { code: 'def', fixed_price: 7.50, inventory_quantity: 5, media: [
    //       { path: 'https://www.vanengelen.com/media/catalog/product/cache/1/thumbnail/0dc2d03fe217f8c83829496872af24a0/t/_/t_paul_scherer_6-w.jpg' }
    //     ] }
    //   ] },
    //   { id: 3, title: 'Tulip Princess Irenet', variants: [
    //     { code: 'ghi', fixed_price: 7.50, inventory_quantity: 7, media: [
    //       { path: 'https://cdn.shopify.com/s/files/1/1902/7917/products/Tulip-Princess-Irene-2017_x2000_crop_center.jpg?v=1571652790' }
    //     ] }
    //   ] },
    //   { id: 4, title: 'Tulip Purple Prince', variants: [
    //     { code: 'jkl', fixed_price: 7.50, inventory_quantity: 3, media: [
    //       { path: 'https://www.highcountrygardens.com/media/catalog/product/t/u/tulipa-purple-prince-elbo09868.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=560&width=560&canvas=560:560' }
    //     ] }
    //   ] },
    //
    //   { id: 5, title: 'Tulip Queen of Night', variants: [
    //     { code: 'mno', fixed_price: 7.50, inventory_quantity: 9, media: [
    //       { path: 'https://cdn.shopify.com/s/files/1/1902/7917/products/Tulip-Queen-of-Night-2017-3_x2000_crop_center.jpg?v=1531150781' }
    //     ] }
    //   ] },
    //   { id: 6, title: 'Tulipa Little Beauty', variants: [
    //     { code: 'pqr', fixed_price: 5.00, inventory_quantity: 7, media: [
    //       { path: 'https://cdn.shopify.com/s/files/1/1419/7120/products/sqTulip_Little_Beauty1.SHUT_800x.jpg?v=1571439573' }
    //     ] }
    //   ] },
    //   { id: 7, title: 'Narcissus Jetfire', variants: [
    //     { code: 'stu', fixed_price: 8.75, inventory_quantity: 3, media: [
    //       { path: 'https://cdn.shopify.com/s/files/1/1022/5071/products/daffodil-narcissus-jetfire-bulbs-early-blooming-now-shipping-1_900x.jpg?v=1601248847' }
    //     ] }
    //   ] }
    // ]
    const { products } = this.props
    return (
      <div className="store-catalog">
        { products.map((product, index) => (
          <Item { ...this._getItem(product) } key={`product_${index}`} />
        ))}
      </div>
    )
  }

  _getItem(product) {
    const { store } = this.props
    return {
      product,
      store
    }
  }

}

export default Catalog
