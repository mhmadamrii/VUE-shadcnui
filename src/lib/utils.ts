import axios from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchDataWithDelay = () => {
  return new Promise((resolve, reject) => {
    // Simulate a delay of 2 seconds
    setTimeout(() => {
      // Perform the data fetching here
      // For example, fetching data using Axios
      axios
        .get('https://api.example.com/data')
        .then((response) => {
          // Resolve the promise with the fetched data
          resolve(response.data)
        })
        .catch((error) => {
          // Reject the promise if there's an error
          reject(error)
        })
    }, 2000) // 2000 milliseconds = 2 seconds
  })
}
