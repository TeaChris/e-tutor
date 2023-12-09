import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function CoursesLayout({
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
