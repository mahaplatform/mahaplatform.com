class Catalog {

  products = []

  constructor(products) {
    this.products = products
  }

  getProducts() {
    return this.products
  }

  getVariants() {
    return this.products.reduce((products, product) => [
      ...products,
      ...product.variants.reduce((variants, variant) => [
        ...variants,
        {
          title: product.title,
          description: product.description,
          ...variant
        }
      ], [])
    ], [])
  }

}

export default Catalog
