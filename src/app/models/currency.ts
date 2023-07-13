export interface Currency {
  success: boolean
  query: Query
  result: number
  diff: number
}

export interface Query {
  from: string
  to: string
  amount: number
}

//for debug
// export const data: Currency[] = [
//   {
//     success: true,
//     query: {
//       from: 'USD',
//       to: 'RUB',
//       amount: 1
//     },
//     result: 98.2,
//     diff: 0
//   },
//   {
//     success: true,
//     query: {
//       from: 'JPN',
//       to: 'RUB',
//       amount: 1
//     },
//     result: 32.2,
//     diff: 0
//   },
//   {
//     success: true,
//     query: {
//       from: 'BYN',
//       to: 'RUB',
//       amount: 1
//     },
//     result: 16.2,
//     diff: 0
//   }
// ]
//
// export const data2: Currency[] = [
//   {
//     success: true,
//     query: {
//       from: 'USD',
//       to: 'RUB',
//       amount: 1
//     },
//     result: 77.2,
//     diff: 0
//   },
//   {
//     success: true,
//     query: {
//       from: 'JPN',
//       to: 'RUB',
//       amount: 1
//     },
//     result: 44.2,
//     diff: 0
//   },
//   {
//     success: true,
//     query: {
//       from: 'BYN',
//       to: 'RUB',
//       amount: 1
//     },
//     result: 23.2,
//     diff: 0
//   }
// ]
