import Checkit from 'checkit'

export const isValid = async (rules, values) => {
  try {
    await validate(rules, values)
    return true
  } catch(e){
    return false
  }
}

export const validate = async (rules, values) => {
  return await Checkit(rules).run(values)
}
