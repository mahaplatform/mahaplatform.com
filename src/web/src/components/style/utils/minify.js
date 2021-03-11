import postcssNormalizeWhitespace from 'postcss-normalize-whitespace'
import postcssMinifySelectors from 'postcss-minify-selectors'
import postcssMergeLonghand from 'postcss-merge-longhand'
import autoprefixer from 'autoprefixer'
import PostCSS from 'postcss'

const postcss = PostCSS([
  postcssMinifySelectors(),
  postcssMergeLonghand(),
  postcssNormalizeWhitespace(),
  autoprefixer()
])

const minify = (css) => {
  return postcss.process(css).toString()
}

export default minify
