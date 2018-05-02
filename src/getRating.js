import ratingsCsv from './ratings.csv'
import parseRatings from './parseRatings'

const ratings = parseRatings(ratingsCsv)

const factions = [
  'Argenport',
  'Combrei',
  'Elysian',
  'Feln',
  'Hooru',
  'Praxis',
  'Rakano',
  'Skycrag',
  'Stonescar',
  'Xenan'
]

factions.forEach(faction => {
  ratings[`${faction} Banner`] = 2
  ratings[`${faction} Stranger`] = 3
})

function getRating(card) {
  let rating = ratings[card]
  if (rating === undefined) {
    Object.keys(ratings).forEach(ratedCard => {
      if (card.startsWith(ratedCard)) rating = ratings[ratedCard]
    })
  }
  return rating === undefined ? 'card rating not found ☹️' : rating
}

export default getRating
