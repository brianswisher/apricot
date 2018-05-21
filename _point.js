const offset = 2

function point (rating) {
  const value = calulate(rating)

  if (value < 4) {
    return `${Math.round(value)} points`
  } else if (value < (5 + offset)) {
    return '5 points'
  } else if (value < (8 + offset)) {
    return '8 points'
  } else if (value < (13 + offset)) {
    return '13 points'
  } else {
    return `break it down more (${value})`
  }
}

function calulate (rating) {
  const multiplier = {people: 1}
  const partial = {acceptance: 0.8}

  return Object.keys(rating).reduce((total, key) => {
    if (multiplier[key]) {
      total = total * rating[key]
    } else if (partial[key]) {
      total = total + (rating[key] * partial[key])
    } else if (rating[key] > 1) {
      total = total + rating[key]
    }

    return total
  }, 0)
}

const args = [...process.argv]

args.shift()
args.shift()

args.forEach(arg => console.log(point(JSON.parse(arg))))

module.exports = point
