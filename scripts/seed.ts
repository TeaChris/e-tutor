const { PrismaClient } = require('@prisma/client')

async function seedCategories() {
  const database = new PrismaClient()

  try {
    await database.$connect()

    // Check if categories exist before creating them
    const existingCategories = await database.category.findMany()

    if (existingCategories.length === 0) {
      await database.category.createMany({
        data: [
          { name: 'Computer Science' },
          { name: 'Music' },
          { name: 'Fitness' },
          { name: 'Photography' },
          { name: 'Accounting' },
          { name: 'Engineering' },
          { name: 'Filming' },
          { name: 'Design' },
          { name: 'Life Style' },
          { name: 'Marketing' },
          { name: 'Health & Fitness' },
          { name: 'Business' },
        ],
      })

      console.log('Category seeding success')
    } else {
      console.log('Categories already exist, skipping seeding.')
    }
  } catch (error) {
    console.error('Error seeding the categories', error)
  } finally {
    await database.$disconnect()
  }
}

async function seedLanguages() {
  const database = new PrismaClient()

  try {
    await database.$connect()

    const existingLanguage = await database.language.findMany()

    if (existingLanguage.length === 0) {
      await database.language.createMany({
        data: [
          { name: 'English' },
          { name: 'Espanol' },
          { name: 'Korean' },
          { name: 'Mandarin' },
          { name: 'Hausa' },
          { name: 'Polish' },
          { name: 'Chinese' },
        ],
      })
      console.log('Language seeding success')
    } else {
      console.log('Languages already exist, skipping seeding.')
    }
  } catch (error) {
    console.error('Error seeding the languages', error)
  }
}

async function seedCourseLevel() {
  const database = new PrismaClient()

  try {
    await database.$connect()

    const existingLevel = await database.courseLevel.findMany()

    if (existingLevel.length === 0) {
      await database.courseLevel.createMany({
        data: [
          { name: 'Beginner' },
          { name: 'Intermediate' },
          { name: 'Advanced' },
          { name: 'Professional' },
        ],
      })
      console.log('Level seeding success')
    } else {
      console.log('level already exist, skipping seeding.')
    }
  } catch (error) {
    console.error('Error seeding the Level', error)
  } finally {
    await database.$disconnect()
  }
}

async function main() {
  await seedCategories()
  await seedLanguages()
  await seedCourseLevel()
}

main()
