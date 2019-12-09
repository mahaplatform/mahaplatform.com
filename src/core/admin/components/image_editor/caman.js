import 'imports-loader?exports=>undefined,require=>false,this=>window!caman'

const CopyAttributes = function(from, to, opts) {
  var attr, _i, _len, _ref, _ref1, _results
  if (opts == null) {
    opts = {}
  }
  _ref = from.attributes
  _results = []
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    attr = _ref[_i]
    if ((opts.except != null) && (_ref1 = attr.nodeName, __indexOf.call(opts.except, _ref1) >= 0)) {
      continue
    }
    _results.push(to.setAttribute(attr.nodeName, attr.nodeValue))
  }
  return _results
}

Caman.Plugin.register('flip', function(axis) {
  let canvas = null
  if(window === undefined) {
    const Canvas = require('canvas')
    canvas = new Canvas()
  } else {
    canvas = document.createElement('canvas')
    CopyAttributes(this.canvas, canvas)
  }
  const flipH = axis.match(/h/) !== null
  const flipV = axis.match(/v/) !== null
  const scaleH = flipH ? -1 : 1
  const scaleV = flipV ? -1 : 1
  const posX = flipH ? this.canvas.width * -1 : 0
  const posY = flipV ? this.canvas.height * -1 : 0
  const ctx = canvas.getContext('2d')
  ctx.save()
  ctx.scale(scaleH, scaleV)
  ctx.drawImage (this.canvas, posX, posY, this.canvas.width, this.canvas.height)
  ctx.restore()
  this.replaceCanvas(canvas)
})

Caman.Filter.register('flip', function() {
  this.processPlugin('flip', Array.prototype.slice.call(arguments, 0))
})

Caman.Plugin.register('text', function(options) {
  const value = options.value || ''
  const color = options.color || 'FFFFFF'
  const font = options.font || 'Arial'
  const size = options.size || 60
  const baseline = options.baseline || 'middle'
  const align = options.align || 'center'
  const padding = options.padding || 0
  let canvas = null
  if(window === undefined) {
    const Canvas = require('canvas')
    canvas = new Canvas()
  } else {
    canvas = document.createElement('canvas')
    CopyAttributes(this.canvas, canvas)
  }
  const ctx = canvas.getContext('2d')
  ctx.save()
  let x = null
  let y = null
  if(align === 'left') {
    x = padding
  } else if(align === 'center') {
    x = this.canvas.width / 2
  } else if(align === 'right') {
    x = this.canvas.width - padding
  }
  if(baseline === 'top') {
    y = padding
  } else if(baseline === 'middle') {
    y = this.canvas.height / 2
  } else if(baseline === 'bottom') {
    y = this.canvas.height - padding
  }
  ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height)
  ctx.textBaseline = baseline
  ctx.textAlign = align
  ctx.font = `${size}px ${font}`
  ctx.fillStyle = color
  ctx.fillText(value, x, y)
  if(options.line_width && options.line_color) {
    ctx.strokeStyle = options.line_color
    ctx.lineWidth = options.line_width
    ctx.strokeText(value, x, y)
  }
  ctx.restore()
  this.replaceCanvas(canvas)
})

Caman.Filter.register('text', function() {
  this.processPlugin('text', Array.prototype.slice.call(arguments, 0))
})

export default Caman