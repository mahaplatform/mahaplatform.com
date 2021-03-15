import { createSelector } from 'reselect'

const getSteps = (state, props) => props.getSteps

const formdata = (state, props) => state.formdata

export const steps = createSelector(
  formdata,
  getSteps,
  (formdata, getSteps) => getSteps(formdata)
)
