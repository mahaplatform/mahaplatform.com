import { toFilter } from '@core/utils/criteria'
import evaluate from './evaluate'

const getBranch = async (branches, data) => {
  return await Promise.reduce(branches, async (found, branch, index) => {
    if(found !== null) return found
    const filter = toFilter(branch.criteria)
    return await evaluate(filter, data) ? index : null
  }, null)
}

const ifThenStep = async (req, { config, state, step, tokens }) => {

  const index = await getBranch(step.branches, tokens)

  if(index == null) {
    return {
      action: {
        data: {
          branch: 'else'
        }
      },
      next: `${state}.else.steps.0`
    }
  }

  const branch = step.branches[index]

  return {
    action: {
      data: {
        branch: branch.name
      }
    },
    next: `${state}.branches.${index}.steps.0`
  }

}

export default ifThenStep
