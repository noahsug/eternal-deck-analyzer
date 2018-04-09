import parseDeck from './parseDeck'
import getRating from './getRating'
import './style.css'

const inputNode = document.querySelector('textarea.input')
const overallNode = document.querySelector('.overall')
const breakdownNode = document.querySelector('.breakdown')
const greaterThan3Node = document.querySelector('.gt3')
const greaterThan2Node = document.querySelector('.gt2')
const greaterThan2AvgNode = document.querySelector('.gt2-avg')

inputNode.addEventListener('paste', onInputChange)
inputNode.addEventListener('change', onInputChange)

function onInputChange() {
  setTimeout(() => {
    updateURI(inputNode.value)
  }, 0)
}

function updateURI(input) {
  location.search = encodeURIComponent(input)
}

function parseUri() {
  const input = decodeURIComponent(location.search).slice(1)
  inputNode.value = input
  const cards = parseDeck(input)
  updateRating(cards)
  updateBreakdown(cards)
  updateGreaterThan(cards)
}

function updateRating(cards) {
  let total = 0
  cards.forEach(card => {
    total += getRating(card)
  })

  overallNode.innerHTML = (total / cards.length).toFixed(2)
}

function updateBreakdown(cards) {
  const ratingGroups = {}
  cards.forEach(card => {
    const rating = getRating(card)
    if (!ratingGroups[rating]) ratingGroups[rating] = []
    ratingGroups[rating].push(card)
  })

  const html = []
  const sortedRatings = Object.keys(ratingGroups)
    .sort()
    .reverse()
  sortedRatings.forEach(rating => {
    html.push(`<div><div><h3>${rating}</h3>`)
    html.push(`<span class="count">(${ratingGroups[rating].length})</span>`)
    html.push(`</div><ul>`)
    ratingGroups[rating].forEach(card => {
      html.push(`<li>${card}</li>`)
    })
    html.push(`</ul></div>`)
  })
  breakdownNode.innerHTML = html.join('')
}

function updateGreaterThan(cards) {
  const greaterThan3 = cards.filter(card => getRating(card) >= 3)
  greaterThan3Node.innerHTML = greaterThan3.length

  const greaterThan2 = cards.filter(card => getRating(card) >= 2)
  greaterThan2Node.innerHTML = greaterThan2.length

  const total = greaterThan2.reduce((total, prev) => {
    return total + getRating(prev)
  }, 0)

  greaterThan2AvgNode.innerHTML = (total / greaterThan2.length).toFixed(2)
}

parseUri()
