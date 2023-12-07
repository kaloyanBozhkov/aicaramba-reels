export function getRandomSubset<T>(array: T[], n: number) {
 // Make a copy of the original array to avoid modifying it
 const shuffledArray = array.slice()

 // Shuffle the array using Fisher-Yates algorithm
 for (let i = shuffledArray.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
 }

 // Return the first X elements of the shuffled array
 return shuffledArray.slice(0, n)
}
