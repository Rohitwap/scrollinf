'use client'
import { useState } from 'react'

export default function RomanNumeralConverter() {
  const [number, setNumber] = useState('')
  const [romanNumeral, setRomanNumeral] = useState('')

  const convertToRoman = (num: number): string => {
    if (num < 1 || num > 100) return 'Please enter a number between 1 and 100'
    
    const romanNumerals = [
      { value: 100, numeral: 'C' },
      { value: 90, numeral: 'XC' },
      { value: 50, numeral: 'L' },
      { value: 40, numeral: 'XL' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 1, numeral: 'I' }
    ]

    let result = ''
    let remaining = num

    for (const { value, numeral } of romanNumerals) {
      while (remaining >= value) {
        result += numeral
        remaining -= value
      }
    }

    return result
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseInt(number)
    setRomanNumeral(convertToRoman(num))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Roman Numeral Converter
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              min="1"
              max="100"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a number (1-100)"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Convert
          </button>
        </form>
        {romanNumeral && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">Result:</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">{romanNumeral}</p>
          </div>
        )}
      </div>
    </div>
  )
}
