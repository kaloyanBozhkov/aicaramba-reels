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

export const getRandomSongWithTime = (music: { length: number; fileName: string }[]) => {
 const ensureAvailable = 20 // Minimum required time in seconds
 const availableTime = ensureAvailable / 100

 // Filter songs based on available time
 const availableSongs = music.filter((song) => song.length >= availableTime)

 // If there are no songs with enough time, return null
 if (availableSongs.length === 0) {
  return null
 }

 // Randomly select a song
 const randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)]

 // Calculate a random start time within the song
 const maxStartTime = randomSong.length - availableTime
 const startTime = Math.random() * maxStartTime

 // Return the selected song and start time
 return {
  fileName: randomSong.fileName,
  length: availableTime,
  startTime: startTime,
 }
}
