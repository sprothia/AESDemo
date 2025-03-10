import AesDemo from "@/components/aes-demo"
import AesExplanation from "@/components/aes-explanation"
import AesVisualizer from "@/components/aes-visualizer"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 relative overflow-hidden">
      {/* Messy background element */}
      <div className="absolute -top-10 -right-20 w-64 h-64 bg-purple-300 rounded-full opacity-20 rotate-12"></div>
      <div className="absolute bottom-40 -left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-30 -rotate-6"></div>

      <div className="relative">
        <h1 className="text-4xl font-bold text-center mb-3 rotate-1 text-blue-800">
          Advanced Encryption Standard (AES)
        </h1>
        <p className="text-lg text-center mb-8 text-muted-foreground -rotate-1">
          Learn how AES encryption works through interactive examples
        </p>

        <div className="flex justify-center mb-10">
          <div className="bg-yellow-100 px-6 py-2 rounded-lg shadow-md transform rotate-2 border-2 border-dashed border-yellow-400">
            <p className="text-xl font-semibold text-center">Created by Siddharth Prothia</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:gap-16">
        <AesExplanation />
        <div className="ml-4 md:ml-12 mr-2">
          <AesDemo />
        </div>
        <div className="-ml-2 md:-ml-6 mr-4">
          <AesVisualizer />
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-300 text-center">
        <div className="transform -rotate-1 inline-block bg-blue-100 px-4 py-2 rounded">
        </div>
        <p className="mt-2 text-sm text-gray-500 transform rotate-1">A slightly messy but functional encryption demo</p>
      </footer>
    </main>
  )
}

