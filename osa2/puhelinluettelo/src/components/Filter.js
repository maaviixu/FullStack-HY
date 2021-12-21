const filterPersons = (arr, query) => {
  console.log('filtteri-komponentissa arr: ', arr, 'query: ', query)
  return arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 )
}

export default filterPersons