import { faker } from '@faker-js/faker'

export const data = Array.from({ length: 10 }, () => {
  return (
    {
      date: faker.date.anytime().toISOString(),
      value: faker.number.int({ min: 0, max: 1000 }),
      insulin: faker.number.int({ min: 2, max: 100 }),
      status: faker.lorem.word()
    }  
  )  
})
