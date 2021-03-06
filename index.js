
console.log(point(config()))

function config () {
  const args = [...process.argv]

  args.shift(); args.shift()

  return args.shift()
}

function point (config) {
  const attrs = config.split(/\/size /).pop().split('  ').join(' ').split('/').shift().trim()
  const total = attrs.split(' ')
   .map(item => tshirt(item)).reduce((total, item) => (item > 1) ? (total + item) : total, 0) || 1

  return snap(total) || total
}

function keyValue (key) {
  const DEFAULT_MULTIPLIER = 1.1
  const multipliers = {
    people: 1.9,
    impact: 1.5
  }

  if (key.match('test')) {
    return multipliers.testing || DEFAULT_MULTIPLIER
  } else if (key.substring(0,2) === 'op') {
    return multipliers.operations || DEFAULT_MULTIPLIER
  } else if (key.match('complex')) {
    return multipliers.complexity || DEFAULT_MULTIPLIER
  } else if (key.substring(0,2) === 'ac') {
    return multipliers.acceptance || DEFAULT_MULTIPLIER
  } else {
    return multipliers[key]
  }
}

function tshirt (item) {
  const itm = item.toLowerCase()
  const spl = itm.split(':')
  const key = spl.shift()
  const isEmpty = spl.pop() === '-'
  const multiplier = isEmpty ? 1 : keyValue(key)

  let val = 0

  if (itm.match(':l')) {
    val = 3 * multiplier
  } else if (itm.match(':m')) {
    val = 2 * multiplier
  } else if (itm.match(':s')) {
    val = 1 * multiplier
  }

  return val
}

function snap (value) {
  const offset = 2
  const val = Math.round(value)

  if (val < 4) {
    return val
  } else if (val < (5 + offset)) {
    return 5
  } else if (val < (8 + offset)) {
    return 8
  } else if (val < (13 + offset)) {
    return 13
  } else {
    return val
  }
}
