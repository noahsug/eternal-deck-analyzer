const HEADING_ROW = 1

const FACTIONS = [
  'Argenport',
  'Combrei',
  'Elysian',
  'Feln',
  'Hooru',
  'Praxis',
  'Rakano',
  'Skycrag',
  'Stonescar',
  'Xenan',
]

function parseRatings(input) {
  const ratings = {}

  for (let i = 0; i < 11; i++) {
    const col = i * 2
    const rating = Number(input[HEADING_ROW][col])

    for (let row = HEADING_ROW + 1; input[row]; row++) {
      const card = input[row][col]
      if (card) ratings[card] = rating
    }
  }

  FACTIONS.forEach(faction => {
    ratings[`${faction} Banner`] = ratings['All Banners']
    ratings[`${faction} Stranger`] = ratings['All Influence Strangers']
  })

  return ratings
}

export default parseRatings
