import { applyBoxModel } from '../utils'

export default function ImageBlock(site, rulesets, styles, namespace) {

  if(styles.caption) applyBoxModel(rulesets, `${namespace} .bic`, styles.caption)

  if(styles.image) applyBoxModel(rulesets, `${namespace} .bii`, styles.image)

  return rulesets

}
