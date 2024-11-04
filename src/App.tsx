'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Sample flash card data
const flashCards = [
  { russian: 'Привет', english: 'Hello' },
  { russian: 'Спасибо', english: 'Thank you' },
  { russian: 'Пожалуйста', english: 'You\'re welcome' },
  { russian: 'Да', english: 'Yes' },
  { russian: 'Нет', english: 'No' },
]

export default function FlashCardApp() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)

  useEffect(() => {
    setSpeechSynthesis(window.speechSynthesis)
  }, [])

  const currentCard = flashCards[currentCardIndex]

  const flipCard = () => setIsFlipped(!isFlipped)

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashCards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashCards.length) % flashCards.length)
    setIsFlipped(false)
  }

  const speakRussian = () => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(currentCard.russian)
      utterance.lang = 'ru-RU'
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-80 h-48 flex items-center justify-center bg-white shadow-lg rounded-lg cursor-pointer" onClick={flipCard}>
        <div className="text-2xl font-bold text-center">
          {isFlipped ? currentCard.english : currentCard.russian}
        </div>
      </Card>
      <div className="mt-4 space-x-2">
        <Button onClick={prevCard}>Previous</Button>
        <Button onClick={nextCard}>Next</Button>
        <Button onClick={speakRussian}>Speak</Button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Card {currentCardIndex + 1} of {flashCards.length}
      </div>
    </div>
  )
}