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

function insertAfter (newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function decorate (d, fitContent) {
  d.style.padding = '2px'
  d.style.display = 'inline-block'
  d.style.marginRight = '4px'
  d.style.backgroundColor = 'green'
  d.style.color = 'white'
  d.style.textAlign = 'center'
  if (fitContent) d.style.height = 'fit-content'
}

function mkDetailDiv (target) {
  const oldD = document.getElementById('APRICOT')

  if (oldD) {
    oldD.parentNode.removeChild(oldD)
  }

  const d = document.createElement('div')

  d.id = 'APRICOT'
  decorate(d, true)
  d.innerHTML = `${point(config())} points`

  insertAfter(d, target)
}

function mkResultDiv (target) {
  const targetText = target.innerText
  const selectorText = targetText.split('"').shift()
  const result = document.querySelector(`[data-tooltip^="${selectorText}"]`)
  const resultId = `id_${escape(targetText)}`
  const oResult = document.getElementById(resultId)

  if (oResult) {
    oResult.parentNode.removeChild(oResult)
  }

  const d = document.createElement('div')

  d.id = resultId
  decorate(d)
  d.innerHTML = `${point(config())}p`

  result.parentNode.insertBefore(d, result)
}

window.APRICOT = function() {
  const header = getFirstHeaderWithClass(args[0])

  mkDetailDiv(header)

  mkResultDiv(header)
}

window.APRICOT()

})(document)
