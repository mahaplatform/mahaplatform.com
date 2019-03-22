export const chunkTest = (module) => {
  if(!module.nameForCondition) return false
  const name = module.nameForCondition()
  const is_filetype = name.match(/\.js$/) !== null
  return is_filetype && !isMahaModule(name)
}

export const ruleTest = (test) => (name) => {
  const is_filetype = name.match(test) !== null
  return is_filetype && isMahaModule(name)
}

export const isMahaModule = (name) => {
  const is_not_submodule = name.match(/(packages|node_modules)\/[^/]*\/node_modules/) === null
  const is_app = name.match(/apps/) !== null
  const is_reframe = name.match(/reframe/) !== null
  const is_tmp = name.match(/tmp/) !== null
  return is_not_submodule && (is_app || is_reframe || is_tmp)
}
