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
  if(_.includes(['zoom','fold'], type)) {
    applyRule(ruleset.standard, selector, { transform: 'scale3d(0.5, 0.5, 0.5)' })
    if(direction === 'center') applyRule(ruleset.standard, selector, { transformOrigin: 'center' })
    if(direction === 'right') applyRule(ruleset.standard, selector, { transformOrigin: 'left' })
    if(direction === 'left') applyRule(ruleset.standard, selector, { transformOrigin: 'right' })
    if(direction === 'up') applyRule(ruleset.standard, selector, { transformOrigin: 'bottom' })
    if(direction === 'down') applyRule(ruleset.standard, selector, { transformOrigin: 'top' })
  }
  if(type === 'flip') {
    if(_.includes(['center','down'], direction)) applyRule(ruleset.standard, selector, { transform: 'perspective(2000px) rotateX(45deg)' })
    if(direction === 'right') applyRule(ruleset.standard, selector, { transform: 'perspective(2000px) rotateY(-45deg)' })
    if(direction === 'left') applyRule(ruleset.standard, selector, { transform: 'perspective(2000px) rotateY(45deg)' })
    if(direction === 'up') applyRule(ruleset.standard, selector, { transform: 'perspective(2000px) rotateX(-45deg)' })
  }
  if(type === 'fold') {
    if(_.includes(['center','left'], direction)) applyRule(ruleset.standard, selector, { transform: 'perspective(2000px) rotateY(-45deg)' })
    if(direction === 'right') applyRule(ruleset.standard, selector, { transform: 'perspective(2000px) rotateY(45deg)' })
    if(direction === 'up') applyRule(ruleset.standard, selector, { transform: 'perspective(2000px) rotateX(45deg)' })
    if(direction === 'down') applyRule(ruleset.standard, selector, { transform: 'perspective(2000px) rotateX(-45deg)' })
  }
  if(type === 'roll') {
    if(_.includes(['left','right','down'], direction)) applyRule(ruleset.standard, selector, { transform: 'rotateZ(180deg)' })
    if(_.includes(['left','up'], direction)) applyRule(ruleset.standard, selector, { transform: 'rotateZ(-180deg)' })
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

const getAnimationType = (type, direction) => {
  return type + (direction !== 'center' ? direction : '' )
}

const applyAnimationType = (rulesets, selector, { type, direction }) => {
  if(!_.includes(['flip','bounce','fold','roll'], type)) return applyRule(rulesets.all.standard, selector, { animationName: type })
  if(!direction.isResponsive) return applyRule(rulesets.all.standard, selector, { animationName: getAnimationType(type, direction.all) })
  applyRule(rulesets.desktop.standard, selector, { animationName: getAnimationType(type, direction.desktop) })
  applyRule(rulesets.tablet.standard, selector, { animationName: getAnimationType(type, direction.tablet) })
  applyRule(rulesets.mobile.standard, selector, { animationName: getAnimationType(type, direction.mobile) })
}

export const applyAnimation = (rulesets, selector, animation) => {
  if(!animation || !animation.type) return
  selector = `${selector}.an`
  applyAnimationType(rulesets, selector, animation)
  applyResponsiveRule(rulesets, selector, animation.duration, applyAnimationDuration)
  applyResponsiveRule(rulesets, selector, animation.delay, applyAnimationDelay)
  applyResponsiveRule(rulesets, selector, animation.opacity, applyAnimationOpacity)
  applyResponsiveRule(rulesets, selector, animation.curve, applyAnimationCurve)
  applyResponsiveRule(rulesets, selector, animation.repeat, applyAnimationRepeat)
  if(!_.includes(['fade','bounce'], animation.type)) {
    applyResponsiveRule(rulesets, selector, animation.direction, applyAnimationDirection, animation.type)
    applyResponsiveRule(rulesets, selector, animation.intensity, applyAnimationIntensity)
  }
}
