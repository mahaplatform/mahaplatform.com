import { applyRule } from './utils'

export const getBoxShadow = (preset) => {
  if(preset === 1) return '0px 2px 18px 0px rgba(0,0,0,0.3)'
  if(preset === 2) return '6px 6px 18px 0px rgba(0,0,0,0.3)'
  if(preset === 3) return '0px 12px 18px -6px rgba(0,0,0,0.3)'
  if(preset === 4) return '10px 10px 0px 0px rgba(0,0,0,0.3)'
  if(preset === 5) return '0px 6px 0px 10px rgba(0,0,0,0.3)'
  if(preset === 6) return 'inset 0px 0px 18px 0px rgba(0,0,0,0.3)'
  if(preset === 7) return 'inset 10px 10px 0px 0px rgba(0,0,0,0.3)'
}

export const applyBoxShadow = (rulesets, selector, boxShadow) => {
  if(!boxShadow) return
  applyRule(rulesets.all.standard, selector, { boxShadow: getBoxShadow(boxShadow.boxShadow) })
}
