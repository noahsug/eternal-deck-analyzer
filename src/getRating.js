import ratingInput from './rating-input.csv'
import parseRatings from './parseRatings'

const ratings = parseRatings(ratingInput)

function getRating(card) {
  if (card.endsWith('Banner')) {
    return 2
  }
  const rating = ratings[card]
  if (rating === undefined) {
    console.error('Failed to find rating for', card)
  }
  return rating || 0
}

export default getRating
