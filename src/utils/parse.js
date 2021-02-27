
// eg key = [{oldKey: 'option_id', newKey: 'label'}]
export const parseArrayOfObject = (keys, data) => {
  let result = [];
  data.map((currentData) => {
    let temp = {}
    for(let key of keys) {
      temp[key.newKey] = currentData[key.oldKey]
    }
    result.push(temp)
  })
  return result
}