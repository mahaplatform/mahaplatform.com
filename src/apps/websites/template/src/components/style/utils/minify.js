import postcssMergeLonghand from 'postcss-merge-longhand'
import autoprefixer from 'autoprefixer'
import PostCSS from 'postcss'

const postcss = PostCSS([
  postcssMergeLonghand(),
  autoprefixer()
])

const minify = (css) => {
  return postcss.process(css).toString()
}

export default minify
