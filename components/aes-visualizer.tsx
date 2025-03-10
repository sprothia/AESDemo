"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AesVisualizer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const totalSteps = 10 // For AES-128

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(interval)
          setIsAnimating(false)
          return totalSteps - 1
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }

  const stepNames = [
    "Initial State",
    "Add Round Key (0)",
    "SubBytes (1)",
    "ShiftRows (1)",
    "MixColumns (1)",
    "Add Round Key (1)",
    "Rounds 2-9...",
    "SubBytes (10)",
    "ShiftRows (10)",
    "Add Round Key (10)",
  ]

  return (
    <Card className="border-4 border-purple-200 shadow-lg transform rotate-[0.7deg]">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-purple-700 ml-4">AES Algorithm Visualization</CardTitle>
          <div className="bg-green-200 px-3 py-1 rounded-full text-sm font-bold -rotate-12">By Siddharth</div>
        </div>
        <CardDescription className="ml-10 text-pink-600">
          See how data transforms through each step of the AES encryption process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="prose max-w-none bg-purple-50 p-5 rounded-lg border-l-4 border-purple-300 transform -rotate-1">
            <p className="text-purple-800">
              AES encryption transforms data through multiple rounds of processing. Each round applies four operations:
              SubBytes (substitution), ShiftRows (transposition), MixColumns (mixing), and AddRoundKey (key
              combination). The animation below shows how a 16-byte block of data changes during AES-128 encryption,
              which uses 10 rounds. The first and last rounds are special, with the final round omitting the MixColumns
              step.
            </p>
            <div className="text-right text-sm text-purple-600 font-mono">- Siddharth Prothia</div>
          </div>

          <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-md bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-dashed border-purple-300 transform rotate-[0.5deg]">
              <div className="text-center mb-4">
                <h3 className="font-medium text-purple-800">AES-128 Encryption Process</h3>
                <p className="text-sm text-purple-600">
                  Step {currentStep + 1}: {stepNames[currentStep]}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-md border-2 text-sm font-mono transform ${i % 2 === 0 ? "rotate-1" : "-rotate-1"}
                      ${getStepHighlight(currentStep, i)}`}
                    style={{ borderColor: getBorderColor(i) }}
                  >
                    {getByteValue(currentStep, i)}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <div className="w-[95%] bg-secondary rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <Button
                onClick={startAnimation}
                disabled={isAnimating}
                className="bg-gradient-to-r from-purple-500 to-pink-500 transform rotate-1"
              >
                {isAnimating ? "Animating..." : "Start Animation"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(0)}
                disabled={currentStep === 0 || isAnimating}
                className="border-2 border-purple-300 transform -rotate-1"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper functions for the animation
function getStepHighlight(step: number, index: number): string {
  // Different highlighting based on the current step
  if (step === 0) {
    return "bg-blue-100"
  } else if (step === 1) {
    return "bg-green-100"
  } else if (step === 2 || step === 7) {
    return "bg-yellow-100"
  } else if (step === 3 || step === 8) {
    // Highlight based on row for ShiftRows
    const row = Math.floor(index / 4)
    if (row === 0) return "bg-blue-100"
    if (row === 1) return "bg-green-100"
    if (row === 2) return "bg-yellow-100"
    return "bg-red-100"
  } else if (step === 4) {
    // Highlight based on column for MixColumns
    const col = index % 4
    if (col === 0) return "bg-blue-100"
    if (col === 1) return "bg-green-100"
    if (col === 2) return "bg-yellow-100"
    return "bg-red-100"
  } else if (step === 5 || step === 9) {
    return "bg-purple-100"
  } else if (step === 6) {
    return "bg-pink-100"
  }
  return "bg-gray-100"
}

function getBorderColor(index: number): string {
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"]
  return colors[index % colors.length]
}

function getByteValue(step: number, index: number): string {
  // Simplified representation of byte values at different steps
  const initialValues = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F"]

  if (step === 0) {
    return initialValues[index]
  } else if (step === 1) {
    // After initial AddRoundKey
    return index % 3 === 0 ? "A" + index.toString() : initialValues[index]
  } else if (step === 2 || step === 7) {
    // After SubBytes
    return "S" + index.toString(16).toUpperCase()
  } else if (step === 3 || step === 8) {
    // After ShiftRows - show shifted positions
    const row = Math.floor(index / 4)
    const col = index % 4
    const newCol = (col + 4 - row) % 4
    const originalIndex = row * 4 + newCol
    return "S" + originalIndex.toString(16).toUpperCase()
  } else if (step === 4) {
    // After MixColumns
    return "M" + index.toString(16).toUpperCase()
  } else if (step === 5 || step === 9) {
    // After AddRoundKey
    return "R" + (step === 5 ? "1" : "10") + "-" + index.toString(16).toUpperCase()
  } else if (step === 6) {
    // Intermediate rounds
    return "..."
  }
  return "??"
}

