// const zellersCongruenceAlgorithm = (day: number) => (month: number) => (
//   year: number,
// ) => {
//   if (month < 3) {
//     month += 12;
//     year -= 1;
//   }
//   return (
//     (day +
//       Math.floor(((month + 1) * 26) / 10) +
//       year +
//       Math.floor(year / 4) +
//       6 * Math.floor(year / 100) +
//       Math.floor(year / 400) -
//       1) %
//     7
//   );
// };

export const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(`${year}-${month + 1}-1`).getDay();
// zellersCongruenceAlgorithm(0)(month)(year);

export function getDaysInMonth(y: number, m: number) {
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1);
}
