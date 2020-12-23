import { applyResponsiveRule, applyRule, withUnits } from './utils'
import _ from 'lodash'

const applyAnimationDirection = (ruleset, selector, direction, type) => {
  if(type === 'slide') {
    if(direction === 'center') applyRule(ruleset.standard, selector, { transform: 'scale3d(0.5, 0.5, 0.5)' })
    if(direction === 'right') applyRule(ruleset.standard, selector, { transform: 'translate3d(-100%, 0, 0)' })
    if(direction === 'left') applyRule(ruleset.standard, selector, { transform: 'translate3d(100%, 0, 0)' })
    if(direction === 'up') applyRule(ruleset.standard, selector, { transform: 'translate3d(0, 100%, 0)' })
    if(direction === 'down') applyRule(ruleset.standard, selector, { transform: 'translate3d(0, -100%, 0)' })
  }
}

const applyAnimationDuration = (ruleset, selector, duration) => {
  applyRule(ruleset.standard, selector, { animationDuration: withUnits(duration, 'ms') })
}

const applyAnimationDelay = (ruleset, selector, delay) => {
  applyRule(ruleset.standard, selector, { animationDelay: withUnits(delay, 'ms') })
}

const applyAnimationIntensity = (ruleset, selector, intensity) => {}

const applyAnimationOpacity = (ruleset, selector, opacity) => {
  applyRule(ruleset.standard, selector, { opacity })
}

const applyAnimationCurve = (ruleset, selector, curve) => {
  applyRule(ruleset.standard, selector, { animationTimingFunction: curve })
}

const applyAnimationRepeat = (ruleset, selector, repeat) => {
  applyRule(ruleset.standard, selector, { animationIterationCount: repeat })
}

export const applyAnimation = (rulesets, selector, animation) => {
  if(!animation || !animation.type) return
  selector = `${selector}.an`
  applyRule(rulesets.all.standard, selector, { animationName: animation.type})
  applyResponsiveRule(rulesets, selector, animation.duration, applyAnimationDuration)
  applyResponsiveRule(rulesets, selector, animation.delay, applyAnimationDelay)
  applyResponsiveRule(rulesets, selector, animation.opacity, applyAnimationOpacity)
  applyResponsiveRule(rulesets, selector, animation.curve, applyAnimationCurve)
  applyResponsiveRule(rulesets, selector, animation.repeat, applyAnimationRepeat)
  if(animation.type !== 'fade') {
    applyResponsiveRule(rulesets, selector, animation.direction, applyAnimationDirection, animation.type)
  }
  if(!_.includes(['fade','bounce'], animation.type)) {
    applyResponsiveRule(rulesets, selector, animation.intensity, applyAnimationIntensity)
  }
}
