((...args)=>{

function config () {
  return args[0].body.innerHTML.split(/\/size /).pop().split('  ').join(' ').split('/').shift().trim()
}

function point (config) {
  const attrs = config.split(/\/size /).pop().split('  ').join(' ').split('/').shift().trim()
  const total = attrs.split(' ')
   .map(item => tshirt(item)).reduce((total, item) => (item > 1) ? (total + item) : total, 0)

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

function getFirstHeaderWithClass (doc) {
  let header

  doc.querySelectorAll('h1')
    .forEach(h=>{
      if (!header && h.className && h.className.length) {
        header = h
      }
    })

  return header
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

window.APRICOT = function() {
  const oldD = document.getElementById('APRICOT')

  if (oldD) {
    oldD.parentNode.removeChild(oldD)
  }

  const d = document.createElement('div')

  d.id = 'APRICOT'
  d.innerHTML = `${point(config())} points`

  const header = getFirstHeaderWithClass(args[0])
  const headerText = header.innerText

  insertAfter(d, header)

  const result = document.querySelector(`[data-tooltip="${headerText}"]`)
  const resultId = `ar_${headerText.split(' ').join('_')}`
  const oResult = document.getElementById(resultId)

  if (oResult) {
    oResult.parentNode.removeChild(oResult)
  }

  const dR = document.createElement('div')

  dR.id = resultId
  dR.style.padding = '2px'
  dR.style.display = 'inline-block'
  dR.style.marginRight = '4px'
  dR.style.backgroundColor = 'green'
  dR.style.color = 'white'
  dR.innerHTML = `${point(config())}p`

  result.parentNode.insertBefore(dR, result)
}

window.APRICOT()

})(document)
