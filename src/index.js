import parseDeck from './parseDeck'
import getRating from './getRating'
import './style.css'

const inputNode = document.querySelector('textarea.input')
const overallNode = document.querySelector('.overall')
const breakdownNode = document.querySelector('.breakdown')

inputNode.addEventListener('paste', onInputChange)

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
    html.push(`<div><h3>${rating}</h3><ul>`)
    ratingGroups[rating].forEach(card => {
      html.push(`<li>${card}</li>`)
    })
    html.push(`</ul></div>`)
  })
  breakdownNode.innerHTML = html.join('')
}

parseUri()
