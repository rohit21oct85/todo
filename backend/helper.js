exports.checkDb = (arr,field, el) => {
      return arr.some( e => e[field] === el);
}
exports.singleData = (arr, field, el) => {
      let data = arr.filter( e => e[field] === el);
      return data[0]
}
exports.allData = (arr, field, el) => {
      let data = arr.filter( e => e[field] === el);
      return data
}


