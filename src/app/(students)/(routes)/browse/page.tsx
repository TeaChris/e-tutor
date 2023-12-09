import { db } from '@/lib/db'
import Categories from './_components/Categories'

export default async function BrowsePage() {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })
  return (
    <div className="p-6">
      <Categories items={categories} />
    </div>
  )
}
