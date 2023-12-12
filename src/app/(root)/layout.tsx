import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`w-screen h-screen bg-neutral-200 overflow-x-hidden`}>
      <div className="w-full h-32">
        <Navbar />
      </div>
      <div className="w-full">{children}</div>

      <Footer />
    </div>
  )
}
