import ratingsCsv from './ratings.csv'
import parseRatings from './parseRatings'

const ratings = parseRatings(ratingsCsv)

function getRating(card) {
  if (card.endsWith('Banner')) {
    return 2
  }
  const rating = ratings[card]
  if (rating === undefined) {
    console.error('Failed to find rating for', card)
  }
  return rating === undefined ? 'card rating not found ☹️' : rating
}

export default getRating
