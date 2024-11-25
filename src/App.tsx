'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample flash card data with categories
const flashCardCategories = {
  adjectives: [
    { "russian": "хорошо", "english": "Good" },
    { "russian": "плохо", "english": "bad" },
    { "russian": "легко", "english": "easy" },
    { "russian": "трудно", "english": "hard" },
    { "russian": "интересно", "english": "interesting" },
    { "russian": "скучно", "english": "boring" },
    { "russian": "дёшево", "english": "cheap" },
    { "russian": "дорого", "english": "expensive" },
    { "russian": "холодно", "english": "cold" },
    { "russian": "тепло", "english": "warm" },
    { "russian": "жарко", "english": "hot" },
    { "russian": "красиво", "english": "beautifully" },
    { "russian": "Весело", "english": "Fun/cheerfully" },
    { "russian": "опасно", "english": "dangerously" },
    { "russian": "ужасно", "english": "terribly" }
  ],
  numberal: [
    { "russian": "ноль", "english": "zero" },
    { "russian": "один", "english": "one" },
    { "russian": "два", "english": "two" },
    { "russian": "три", "english": "three" },
    { "russian": "четыре", "english": "four" },
    { "russian": "пять", "english": "five" },
    { "russian": "шесть", "english": "six" },
    { "russian": "семь", "english": "seven" },
    { "russian": "восемь", "english": "eight" },
    { "russian": "девять", "english": "nine" },
    { "russian": "десять", "english": "ten" },
    { "russian": "одиннадцать", "english": "eleven" },
    { "russian": "двенадцать", "english": "twelve" },
    { "russian": "тринадцать", "english": "thirteen" },
    { "russian": "четырнадцать", "english": "fourteen" },
    { "russian": "пятнадцать", "english": "fifteen" },
    { "russian": "шестнадцать", "english": "sixteen" },
    { "russian": "семнадцать", "english": "seventeen" },
    { "russian": "восемнадцать", "english": "eighteen" },
    { "russian": "девятнадцать", "english": "nineteen" },
    { "russian": "двадцать", "english": "twenty" },
    { "russian": "тридцать", "english": "thirty" },
    { "russian": "сорок", "english": "forty" },
    { "russian": "пятьдесят", "english": "fifty" },
    { "russian": "шестьдесят", "english": "sixty" },
    { "russian": "семьдесят", "english": "seventy" },
    { "russian": "восемьдесят", "english": "eighty" },
    { "russian": "девяносто", "english": "ninety" },
    { "russian": "сто", "english": "a hundred" },
    { "russian": "двадцать один", "english": "twenty-one" },
    { "russian": "сорок пять", "english": "forty-five" },
    { "russian": "шестьдесят три", "english": "sixty-three" },
    { "russian": "семьдесят девять", "english": "seventy-nine" },
    { "russian": "восемьдесят два", "english": "eighty-two" },
    { "russian": "девяносто шесть", "english": "ninety-six" },
    { "russian": "сто один", "english": "one hundred and one" },
    { "russian": "сто пятьдесят", "english": "one hundred and fifty" },
    { "russian": "сто девяносто девять", "english": "one hundred and ninety-nine" }
  ],
  numbers: [
    { russian: 'Один', english: 'One' },
    { russian: 'Два', english: 'Two' },
    { russian: 'Три', english: 'Three' },
    { russian: 'Четыре', english: 'Four' },
  ],
  seasons: [
    { russian: 'Весна', english: 'Spring' },
    { russian: 'Лето', english: 'Summer' },
    { russian: 'Осень', english: 'Autumn' },
    { russian: 'Зима', english: 'Winter' },
    { "russian": "весной", "english": "in spring" },
    { "russian": "летом", "english": "in summer" },
    { "russian": "осенью", "english": "in autumn" },
    { "russian": "зимой", "english": "in winter" }
  ],
  months: [
    { "russian": "Январь", "english": "January" },
    { "russian": "Февраль", "english": "February" },
    { "russian": "Март", "english": "March" },
    { "russian": "Апрель", "english": "April" },
    { "russian": "Май", "english": "May" },
    { "russian": "Июнь", "english": "June" },
    { "russian": "Июль", "english": "July" },
    { "russian": "Август", "english": "August" },
    { "russian": "Сентябрь", "english": "September" },
    { "russian": "Октябрь", "english": "October" },
    { "russian": "Ноябрь", "english": "November" },
    { "russian": "Декабрь", "english": "December" },
    { "russian": "в январе", "english": "in January" },
    { "russian": "в феврале", "english": "in February" },
    { "russian": "в марте", "english": "in March" },
    { "russian": "в апреле", "english": "in April" },
    { "russian": "в мае", "english": "in May" },
    { "russian": "в июне", "english": "in June" },
    { "russian": "в июле", "english": "in July" },
    { "russian": "в августе", "english": "in August" },
    { "russian": "в сентябре", "english": "in September" },
    { "russian": "в октябре", "english": "in October" },
    { "russian": "в ноябре", "english": "in November" },
    { "russian": "в декабре", "english": "in December" }
]
}

const categories = Object.keys(flashCardCategories)

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];  // Swap elements
  }
  return array;
}

flashCardCategories.adjectives = shuffleArray(flashCardCategories.adjectives)
flashCardCategories.numberal = shuffleArray(flashCardCategories.numberal)

// E

export default function FlashCardApp() {
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)

  useEffect(() => {
    setSpeechSynthesis(window.speechSynthesis)
  }, [])

  const currentCards = flashCardCategories[currentCategory]
  const currentCard = currentCards[currentCardIndex]

  const flipCard = () => setIsFlipped(!isFlipped)

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % currentCards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + currentCards.length) % currentCards.length)
    setIsFlipped(false)
  }

  const speakRussian = () => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentCard.russian)
      utterance.lang = 'ru-RU'
      speechSynthesis.speak(utterance)
    }
  }

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category)
    setCurrentCardIndex(0)
    setIsFlipped(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Tabs value={currentCategory} onValueChange={handleCategoryChange} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-3">
          {
            categories.map((category) => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))
          }
        </TabsList>
        {Object.keys(flashCardCategories).map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <Card className="w-full h-48 flex items-center justify-center bg-white shadow-lg rounded-lg cursor-pointer" onClick={flipCard}>
              <div className="text-2xl font-bold text-center">
                {isFlipped ? currentCard.english : currentCard.russian}
              </div>
            </Card>
            <div className="mt-4 flex justify-between items-center">
              <Button onClick={prevCard}>Previous</Button>
              <Button onClick={speakRussian}>Speak</Button>
              <Button onClick={nextCard}>Next</Button>
            </div>
            <div className="mt-2 text-sm text-center text-gray-600">
              Card {currentCardIndex + 1} of {currentCards.length}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}