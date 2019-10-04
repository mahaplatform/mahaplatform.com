export const alignments = [
  { value: 'left', text: 'Left' },
  { value: 'center', text: 'Center' },
  { value: 'right', text: 'Right' }
]

export const block_types = [
  { text: 'Heading 1', value: 'h1' },
  { text: 'Heading 2', value: 'h2' },
  { text: 'Heading 3', value: 'h3' },
  { text: 'Heading 4', value: 'h4' },
  { text: 'Text', value: 'p' }
]

export const columns = [
  { value: 1, text: '1 column' },
  { value: 2, text: '2 columns' }
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

export const splits = [
  { value: [6,6], text: 'Half' },
  { value: [4,8], text: 'One Third, Two Thirds' },
  { value: [8,4], text: 'Two Thirds, One Third' }
]

export const border_styles = [
  { value: null, text: 'None' },
  { value: 'solid', text: 'Solid' },
  { value: 'dashed', text: 'Dashed' },
  { value: 'dotted', text: 'Dotted' },
  { value: 'double', text: 'Double' },
  { value: 'groove', text: 'Groove' },
  { value: 'ridge', text: 'Ridge' },
  { value: 'inset', text: 'Inset' },
  { value: 'outset', text: 'Outset' }
]

export const border_widths = Array(20).fill(0).map((i,j) => ({
  value: j + 1,
  text: `${j + 1}px`
}))

export const paddings = [
  { value: 0, text: 'None' },
  ...Array(20).fill(0).map((i,j) => ({
    value: j + 1,
    text: `${j + 1}px`
  }))
]
