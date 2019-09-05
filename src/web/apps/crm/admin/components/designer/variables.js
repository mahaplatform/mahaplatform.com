export const alignments = [
  { value: 'left', text: 'Left' },
  { value: 'center', text: 'Center' },
  { value: 'right', text: 'Right' }
]

export const devices = [
  { label: 'Desktop', type: 'desktop' },
  { label: 'Galaxy S5', type: 'mobile', height: 640, width: 360 },
  { label: 'Pixel 2', type: 'mobile', height: 731, width: 411 },
  { label: 'Galaxy 2 XL', type: 'mobile', height: 823, width: 411 },
  { label: 'iPhone 5/SE', type: 'mobile', height: 568, width: 320 },
  { label: 'iPhone 6/7/8', type: 'mobile', height: 667, width: 375 },
  { label: 'iPhone 6/7/8 Plus', type: 'mobile', height: 736, width: 414 },
  { label: 'iPhone X', type: 'mobile', height: 812, width: 375 },
  { label: 'iPad', type: 'mobile', height: 1024 , width: 768 },
  { label: 'iPad Pro', type: 'mobile', height: 1366 , width: 1024 }
]

export const displays = [
  { value: 'inline', text: 'Fit to Text' },
  { value: 'block', text: 'Full Width' }
]

export const fonts = [
  { value: 'Arial, Helvetica, sans-serif', text: 'Arial' },
  { value: '"Comic Sans MS", cursive, sans-serif', text: 'Comic Sans' },
  { value: '"Courier New", Courier, monospace', text: 'Courier New' },
  { value: 'Georgia, serif', text: 'Georgia' },
  { value: '"Helvetica Neue", Helvetica, Arial, Verdana, sans-serif', text: 'Helvetica' },
  { value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif', text: 'Lucida' },
  { value: 'Tahoma, Geneva, sans-serif', text: 'Tahoma' },
  { value: '"Times New Roman", Times, serif', text: 'Times New Roman' },
  { value: '"Trebuchet MS", Helvetica, sans-serif', text: 'Trebuchet MS' },
  { value: 'Verdana, Geneva, sans-serif', text: 'Verdana' }
]

export const font_size = [9,10,11,12,13,14,16,18,20,22,24,28,30,36,48,60,72].map(value => `${value}px`)

export const link_strategies = [
  { value: 'web', text: 'Web Address' },
  { value: 'email', text: 'Email Address' },
  { value: 'anchor', text: 'Anchor Link' },
  { value: 'asset', text: 'File' }
]

export const line_heights = [
  { value: 1, text: 'Normal' },
  { value: 1.3, text: 'Slight' },
  { value: 1.5, text: '1 1/2 spacing' },
  { value: 2, text: 'Double space' }
]

export const letter_spacing = [-5,-4,-3,-2,-1,0,1,2,3,4,5].map(value => `${value}px`)

export const orientations = [
  { label: 'Portrait' },
  { label: 'Landscape' }
]
