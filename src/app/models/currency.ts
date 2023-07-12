export interface Currency {
  success: boolean
  query: Query
  result: number
  diff: number | 0
}

export interface Query {
  from: string
  to: string
  amount: number
}
// {
//   "success": true,
//   "query": {
//   "from": "USD",
//     "to": "RUB",
//     "amount": 1
// },
//   "info": {
//   "timestamp": 1689096783,
//     "quote": 90.250014
// },
//   "result": 90.250014
// }
