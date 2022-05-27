export const parseQuery = (obj = {}) => {
  let queryString = '';

  Object.keys(obj)
  .forEach(key => {
    if(obj[key] === '') return;
    queryString += `${queryString === '' ? '?' : '&'}${key}=${obj[key]}`
  })
  
  return queryString;
}