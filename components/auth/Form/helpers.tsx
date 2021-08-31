export const handleOnInputChange = (fn: (value: any) => void) => (e: any) => {
  return fn(e.target.value)
}
export const handleOnCheckoxChange = (fn: (value: any) => void) => (e: any) => {
  return fn(e.target.checked)
}
