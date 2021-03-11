import { useState, useEffect } from 'react'

const getDuration = (duration) => {
  if(!duration.isResponsive) return duration.all || duration
  return duration.desktop
}

export const applyAnimation = (animation) => {

  if(!animation) return false

  const [animated, setAnimated] = useState(false)

  const [animate, setAnimate] = useState(false)

  const duration = getDuration(animation.duration)

  useEffect(() => {
    if(animation && !animated) {
      setAnimate(true)
      setAnimated(true)
      setTimeout(() => {
        setAnimate(false)
      }, duration)
    }
    return () => {}
  })

  return animate

}
