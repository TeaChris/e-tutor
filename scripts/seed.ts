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

async function courseDuration() {
  const database = new PrismaClient()

  try {
    await database.$connect()

    const duration = await database.courseDuration.findMany()

    if (duration.length === 0) {
      await database.courseDuration.createMany({
        data: [
          { name: '1 hour' },
          { name: '2 hours' },
          { name: '3 hours' },
          { name: '4 hours' },
          { name: '5 hours' },
          { name: '6 hours' },
          { name: '7 hours' },
          { name: '8 hours' },
          { name: '9 hours' },
          { name: '10 hours' },
          { name: '11 hours' },
          { name: '12 hours' },
          { name: '13 hours' },
          { name: '14 hours' },
          { name: '15 hours' },
          { name: '20 hours' },
          { name: '25 hours' },
          { name: '26 hours' },
          { name: '30 hours' },
        ],
      })
      console.log('duration seeding success')
    } else {
      console.log('duration already exist, skipping seeding.')
    }
  } catch (error) {
    console.error('Error seeding the duration', error)
  } finally {
    await database.$disconnect()
  }
}

async function main() {
  await seedCategories()
  await seedLanguages()
  await seedCourseLevel()
  await courseDuration()
}

main()
