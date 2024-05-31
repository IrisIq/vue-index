/*
 * @Author: IrisIq
 * @Date: 2022-11-04 16:13:39
 * @LastEditors: IrisIq
 * @LastEditTime: 2024-05-31 16:42:49
 * @Description: content
 */
import { getAction } from './manage'

const getFood = query => getAction('/instrument/food', query)
const getFoodType = () => getAction('/instrument/food/getType')

export { getFood, getFoodType }
