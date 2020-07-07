export const state = () => ({
  isAddressValid: false,
  isMethodValid: false,
  activeStep: 0,
  selectedShippingMethod: null,
})

export const mutations = {
  ADDRESS_VALIDATE(state, value) {
    state.isAddressValid = value
  },
  METHOD_VALIDATE(state, value) {
    state.isMethodValid = value
  },
  CHANGE_ACTIVE_STEP(state, value) {
    state.activeStep = value
  },
  CHANGE_SHIPPING_METHOD(state, value) {
    state.selectedShippingMethod = value
  },

}
export const getters = {
  isAddressValid(state) {
    return state.isAddressValid
  },
  isMethodValid(state) {
    return state.isMethodValid
  },
  activeStep(state) {
    return state.activeStep
  },
  selectedShippingMethod(state) {
    return state.selectedShippingMethod
  },

}
