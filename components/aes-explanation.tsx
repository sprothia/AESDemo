import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AesExplanation() {
  return (
    <Card className="border-4 border-blue-200 shadow-lg transform rotate-[0.5deg]">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-2xl text-blue-700 ml-2">Understanding AES Encryption</CardTitle>
        <CardDescription className="ml-6 text-purple-700">
          The Advanced Encryption Standard (AES) is a symmetric encryption algorithm widely used to secure sensitive
          data
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-[98%] ml-2 grid-cols-3 bg-blue-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-300">
              Overview
            </TabsTrigger>
            <TabsTrigger value="process" className="data-[state=active]:bg-green-300">
              Process
            </TabsTrigger>
            <TabsTrigger value="key-sizes" className="data-[state=active]:bg-yellow-300">
              Key Sizes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4 ml-3 mr-5">
            <h3 className="text-lg font-medium text-blue-800">What is AES?</h3>
            <p className="bg-blue-50 p-3 rounded-md">
              The Advanced Encryption Standard (AES) is a symmetric block cipher chosen by the U.S. government to
              protect classified information. It was established by the U.S. National Institute of Standards and
              Technology (NIST) in 2001.
            </p>
            <p className="italic ml-4">
              AES replaced the Data Encryption Standard (DES), which had been in use since 1977. AES is widely used
              across the world in various applications including secure communications, file encryption, and password
              management.
            </p>
            <div className="text-right text-sm text-blue-600 font-mono">- Siddharth's Notes</div>
          </TabsContent>

          <TabsContent value="process" className="space-y-4 mt-4 ml-6 mr-2">
            <h3 className="text-lg font-medium text-green-800">How AES Works</h3>
            <p>
              AES operates on a 4×4 column-major order array of bytes, termed the state. The key size used for an AES
              cipher specifies the number of transformation rounds that convert the input, called the plaintext, into
              the final output, called the ciphertext.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2 bg-green-50 p-4 rounded-md border-l-4 border-green-300">
              <li>
                SubBytes — a non-linear substitution step where each byte is replaced with another according to a lookup
                table
              </li>
              <li>ShiftRows — a transposition step where the last three rows of the state are shifted cyclically</li>
              <li>
                MixColumns — a mixing operation which operates on the columns of the state, combining the four bytes in
                each column
              </li>
              <li>AddRoundKey — each byte of the state is combined with a byte of the round key using bitwise XOR</li>
            </ul>
          </TabsContent>

          <TabsContent value="key-sizes" className="space-y-4 mt-4 ml-2 mr-6">
            <h3 className="text-lg font-medium text-yellow-800">AES Key Sizes</h3>
            <p>AES supports three different key lengths:</p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <Card className="border-2 border-yellow-300 transform -rotate-1">
                <CardHeader className="pb-2 bg-yellow-50">
                  <CardTitle className="text-center text-yellow-800">AES-128</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>128-bit keys (16 bytes)</p>
                  <p>10 rounds of encryption</p>
                  <p>Good balance of security and performance</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-orange-300 transform rotate-1">
                <CardHeader className="pb-2 bg-orange-50">
                  <CardTitle className="text-center text-orange-800">AES-192</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>192-bit keys (24 bytes)</p>
                  <p>12 rounds of encryption</p>
                  <p>Higher security than AES-128</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-red-300 transform -rotate-1">
                <CardHeader className="pb-2 bg-red-50">
                  <CardTitle className="text-center text-red-800">AES-256</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>256-bit keys (32 bytes)</p>
                  <p>14 rounds of encryption</p>
                  <p>Highest security level</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

