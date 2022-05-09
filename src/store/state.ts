export type State = {

  // Current PIN code
  code: string,

  // Number of wrong PIN codes in a row
  failCount: number,

  // Number of characters required for a valid PIN code 
  validLength: number,

  // Number of attempts beyond which the PIN pad is locked
  lockThreshold: number,

  // Time in seconds before the PIN pad is locked
  lockTimeout: number
}

export const state: State = {
  code: '',
  failCount: -1,
  validLength: JSON.parse(process.env.VUE_APP_PIN_LENGTH),
  lockThreshold: JSON.parse(process.env.VUE_APP_LOCK_THRESHOLD),
  lockTimeout: JSON.parse(process.env.VUE_APP_LOCK_TIMEOUT)
}
