export const alignments = [
  { value: 'left', text: 'Left' },
  { value: 'center', text: 'Center' },
  { value: 'right', text: 'Right' }
]

export const positions = [
  { value: 'top', text: 'Top' },
  { value: 'right', text: 'Right' },
  { value: 'bottom', text: 'Bottom' },
  { value: 'left', text: 'Left' }
]

export const block_types = [
  { text: 'Heading 1', value: 'h1' },
  { text: 'Heading 2', value: 'h2' },
  { text: 'Text', value: 'p' }
]

export const columns = [
  { value: 1, text: '1 column' },
  { value: 2, text: '2 columns' }
]

export const displays = [
  { value: 'block', text: 'Full Width' },
  { value: 'inline', text: 'Fit to Text' }
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

export const link_strategies = [
  { value: 'web', text: 'Web Address' },
  { value: 'email', text: 'Email Address' },
  { value: 'asset', text: 'File' }
]

export const line_heights = [
  { value: 1, text: 'Normal' },
  { value: 1.3, text: 'Slight' },
  { value: 1.5, text: '1 1/2 spacing' },
  { value: 2, text: 'Double space' }
]

export const letter_spacing = [-5,-4,-3,-2,-1,0,1,2,3,4,5].map(value => ({
  value,
  text: `${value}px`
}))

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

export const font_families = [
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

export const font_sizes = [8,9,10,11,12,14,16,18,24,30,36,48,60,72,96,108].map(value => ({
  value,
  text: `${value}px`
}))

export const image_positions = [
  { value: 'top', text: 'Top' },
  { value: 'bottom', text: 'Bottom' },
  { value: 'left', text: 'Left' },
  { value: 'right', text: 'Right' }
]

export const image_widths = [
  { value: 3, text: 'One-quarter' },
  { value: 4, text: 'One-third' },
  { value: 6, text: 'One-half' },
  { value: 8, text: 'Two-Thirds' },
  { value: 9, text: 'Three-quarters' }
]

export const form_widths = [
  { value: '100%', text: 'Full' },
  { value: '770px', text: 'Fixed' }
]

export const cover_widths = [
  { value: 1, text: 'One-half' },
  { value: 2, text: 'Two-Thirds' }
]

export const cover_positions = [
  { value: 0, text: 'Left' },
  { value: 2, text: 'Right' }
]

export const cover_justifications = [
  { value: 'left', text: 'Left' },
  { value: 'center', text: 'Center' },
  { value: 'right', text: 'Right' }
]

export const strategies = [
  { value: 'message', text: 'Show Message' },
  { value: 'redirect', text: 'Redirect to URL' }
]
