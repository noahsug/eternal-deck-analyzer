const HEADING_ROW = 1

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
  return ratings
}

export default parseRatings
