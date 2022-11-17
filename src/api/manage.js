import Axios from '@/utils/http'

export const postAction = (url, parameter) => {
  return Axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

export const getAction = (url, parameter) => {
  return Axios({
    url: url,
    method: 'get',
    params: parameter
  })
}
