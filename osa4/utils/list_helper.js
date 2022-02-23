// täällä on funktiot testaamista varten

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = blogs.reduce(function(previousValue, currentValue) {
    return previousValue + currentValue.likes

  }, 0)
  return likes
}

module.exports = {
  dummy,
  totalLikes
}