import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`w-screen bg-neutral-200 overflow-x-hidden`}>
      <div className="w-full h-full">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  )
}
