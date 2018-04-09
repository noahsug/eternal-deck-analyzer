function parseDeck(input) {
  return parseCardList(input).filter(shouldIncludeCard)
}

function shouldIncludeCard(card) {
  return !card.endsWith('Sigil')
}

function parseCardList(input) {
  const cards = []
  input
    .split('\n')
    .filter(n => !!n)
    .forEach(row => {
      const card = parseCard(row)
      for (let i = 0; i < card.count; i++) cards.push(card.name)
    })

  return cards
}

function parseCard(row) {
  const match = row.match(/(\d+) (.*) \(.*\)/)
  return {
    count: match[1],
    name: match[2],
  }
}

export default parseDeck
