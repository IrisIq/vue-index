import { getAction } from './manage'

const getFood = query => getAction('/instrument/food', query)

export { getFood }
