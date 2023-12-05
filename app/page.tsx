import Image from 'next/image'

export default function Home() {

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="relative flex place-items-center m-4 text-2xl">
        Hello there.
      </div>

      <div className="relative flex place-items-center">
        <input placeholder="한국어로 번역해 보세요" autoFocus type="text" className="p-4 outline-none"></input>
        <button className="bg-blue-300 hover:bg-blue-400 text-gray-900 p-4 px-6 inline-flex items-center rounded-tr-lg rounded-br-lg transition-colors">
        <span>SUBMIT</span>
      </button>
      </div>
    </main>
  )
}
