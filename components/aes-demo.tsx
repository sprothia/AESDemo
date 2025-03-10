"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Copy, Lock, Unlock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import CryptoJS from "crypto-js"

export default function AesDemo() {
  const [plaintext, setPlaintext] = useState("")
  const [key, setKey] = useState("")
  const [keySize, setKeySize] = useState("128")
  const [ciphertext, setCiphertext] = useState("")
  const [decrypted, setDecrypted] = useState("")
  const [error, setError] = useState("")

  const encrypt = () => {
    try {
      setError("")
      if (!plaintext) {
        setError("Please enter text to encrypt")
        return
      }
      if (!key) {
        setError("Please enter an encryption key")
        return
      }

      // Ensure the key is the right length by hashing it
      const keyHash = CryptoJS.SHA256(key).toString()
      const keyBytes =
        keySize === "128" ? keyHash.substring(0, 32) : keySize === "192" ? keyHash.substring(0, 48) : keyHash

      // Generate a random IV
      const iv = CryptoJS.lib.WordArray.random(16)

      // Encrypt using CBC mode
      const encrypted = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Hex.parse(keyBytes), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })

      // Store the IV with the ciphertext for decryption
      const result = iv.toString() + ":" + encrypted.toString()

      setCiphertext(result)
      setDecrypted("")
    } catch (err) {
      setError("Encryption error: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  const decrypt = () => {
    try {
      setError("")
      if (!ciphertext) {
        setError("Please encrypt some text first")
        return
      }
      if (!key) {
        setError("Please enter the decryption key")
        return
      }

      // Ensure the key is the right length by hashing it
      const keyHash = CryptoJS.SHA256(key).toString()
      const keyBytes =
        keySize === "128" ? keyHash.substring(0, 32) : keySize === "192" ? keyHash.substring(0, 48) : keyHash

      // Extract IV from the ciphertext
      const parts = ciphertext.split(":")
      if (parts.length !== 2) {
        setError("Invalid ciphertext format")
        return
      }

      const iv = CryptoJS.enc.Hex.parse(parts[0])
      const encryptedText = parts[1]

      const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Hex.parse(keyBytes), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8)
      if (!decryptedText) {
        setError("Decryption failed. Check your key and try again.")
        return
      }

      setDecrypted(decryptedText)
    } catch (err) {
      setError("Decryption error: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card className="border-4 border-green-200 shadow-lg transform -rotate-[0.8deg]">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-green-700 ml-3">Siddharth's AES Encryption Demo</CardTitle>
          <div className="bg-yellow-200 px-3 py-1 rounded-full text-sm font-bold rotate-12">Try it!</div>
        </div>
        <CardDescription className="ml-8 text-green-600">
          Try encrypting and decrypting messages using AES
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {error && (
          <Alert variant="destructive" className="border-4 border-red-300 transform rotate-[0.5deg]">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5 ml-2 mr-6">
            <div className="space-y-2 bg-blue-50 p-4 rounded-md transform -rotate-1">
              <Label htmlFor="plaintext" className="text-blue-700 font-bold">
                Text to Encrypt
              </Label>
              <Textarea
                id="plaintext"
                placeholder="Enter text to encrypt..."
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                rows={4}
                className="border-2 border-blue-200"
              />
            </div>

            <div className="space-y-2 bg-purple-50 p-4 rounded-md transform rotate-1">
              <Label htmlFor="key" className="text-purple-700 font-bold">
                Encryption Key
              </Label>
              <Input
                id="key"
                placeholder="Enter your secret key..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="border-2 border-purple-200"
              />
              <p className="text-xs text-purple-600 italic ml-4">
                The key will be hashed to ensure proper length for the selected AES variant
              </p>
            </div>

            <div className="space-y-2 bg-green-50 p-4 rounded-md transform -rotate-1">
              <Label htmlFor="keySize" className="text-green-700 font-bold">
                Key Size
              </Label>
              <Select value={keySize} onValueChange={setKeySize}>
                <SelectTrigger id="keySize" className="border-2 border-green-200">
                  <SelectValue placeholder="Select key size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="128">AES-128</SelectItem>
                  <SelectItem value="192">AES-192</SelectItem>
                  <SelectItem value="256">AES-256</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={encrypt}
              className="w-[95%] ml-4 bg-gradient-to-r from-blue-500 to-green-500 transform rotate-1"
            >
              <Lock className="mr-2 h-4 w-4" />
              Encrypt
            </Button>
          </div>

          <div className="space-y-5 ml-6 mr-2">
            <div className="space-y-2 bg-yellow-50 p-4 rounded-md transform rotate-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="ciphertext" className="text-yellow-700 font-bold">
                  Encrypted Result
                </Label>
                {ciphertext && (
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(ciphertext)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Textarea
                id="ciphertext"
                placeholder="Encrypted text will appear here..."
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
                rows={4}
                readOnly={!ciphertext}
                className="border-2 border-yellow-200 font-mono"
              />
            </div>

            <Button
              onClick={decrypt}
              className="w-[95%] mr-4 bg-gradient-to-r from-red-500 to-yellow-500 transform -rotate-1"
              disabled={!ciphertext}
            >
              <Unlock className="mr-2 h-4 w-4" />
              Decrypt
            </Button>

            <div className="space-y-2 bg-red-50 p-4 rounded-md transform -rotate-1">
              <Label htmlFor="decrypted" className="text-red-700 font-bold">
                Decrypted Result
              </Label>
              <Textarea
                id="decrypted"
                placeholder="Decrypted text will appear here..."
                value={decrypted}
                rows={4}
                readOnly
                className="border-2 border-red-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 text-center transform rotate-1">
          <span className="inline-block bg-blue-100 px-3 py-1 rounded-lg text-blue-800 font-mono text-sm">
            Siddharth's AES Demo - CBC Mode
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

