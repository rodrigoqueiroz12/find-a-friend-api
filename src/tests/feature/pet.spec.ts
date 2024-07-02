import path from 'node:path'

import request from 'supertest'

import { app } from '@/app'
import { StoreUserRequestBody } from '@/app/http/requests/store-user.request'

describe('pet feature tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to an admin user register a new pet', async () => {
    const userData: StoreUserRequestBody = {
      name: 'John Doe',
      role: 'admin',
      email: 'john.doe@mail.com',
      password: '12345678',
      passwordConfirmation: '12345678',
  
      contact: '(00) 0 0000-0000',
  
      zipCode: '00000-000',
      street: 'Some street',
      number: '123456',
      neighborhood: 'Some neighborhood',
      city: 'Some city',
      state: 'PA'
    }
  
    await request(app.server)
      .post('/api/users')
      .send(userData)
  
    const userRes = await request(app.server)
      .post('/api/auth/sign-in')
      .send({ email: userData.email, password: userData.password })
  
    const cookies = userRes.get('Set-Cookie') ?? []
  
    await request(app.server)
      .post('/api/pets')
      .set('Cookie', cookies)
      .field('name', 'Little dog')
      .field('about', 'A big dog')
      .field('age', 'old')
      .field('energy', 'low')
      .field('ambient', 'wide')
      .field('size', 'medium')
      .field('independency', 'high')
      .field('requirements', 'Take a shower every day')
      .field('requirements', 'Brush your teeth every day')
      .attach('pictures', path.resolve(__dirname, '../test-assets/test.png'))
      .attach('pictures', path.resolve(__dirname, '../test-assets/test.png'))
      .expect(201)
  })

  it('should not be able to and non admin user register a new pet', async () => {
    const userData: StoreUserRequestBody  = {
      name: 'John Doe',
      role: 'user',
      email: 'john.doe.user@mail.com',
      password: '12345678',
      passwordConfirmation: '12345678',

      contact: '(00) 0 0000-0000',

      zipCode: '00000-000',
      street: 'Some street',
      number: '123456',
      neighborhood: 'Some neighborhood',
      city: 'Some city',
      state: 'PA'
    }

    await request(app.server)
      .post('/api/users')
      .send(userData)

    const userRes = await request(app.server)
      .post('/api/auth/sign-in')
      .send({ email: userData.email, password: userData.password })

    const cookies = userRes.get('Set-Cookie') ?? []

    await request(app.server)
      .post('/api/pets')
      .set('Cookie', cookies)
      .expect(401)
  })

  it('should not be able to filter pets without city or state', async () => {
    await request(app.server)
      .get('/api/pets')
      .expect(400)
  })

  it('should be able to filter pets by city and state', async () => {
    const userData: StoreUserRequestBody  = {
      name: 'John Doe',
      role: 'admin',
      email: 'john.doe.admin@mail.com',
      password: '12345678',
      passwordConfirmation: '12345678',

      contact: '(00) 0 0000-0000',

      zipCode: '00000-000',
      street: 'Some street',
      number: '123456',
      neighborhood: 'Some neighborhood',
      city: 'Some city',
      state: 'SC'
    }

    await request(app.server)
      .post('/api/users')
      .send(userData)

    const userRes = await request(app.server)
      .post('/api/auth/sign-in')
      .send({ email: userData.email, password: userData.password })
  
    const cookies = userRes.get('Set-Cookie') ?? []

    await request(app.server)
      .post('/api/pets')
      .set('Cookie', cookies)
      .field('name', 'Little dog')
      .field('about', 'A big dog')
      .field('age', 'old')
      .field('energy', 'low')
      .field('ambient', 'wide')
      .field('size', 'medium')
      .field('independency', 'high')
      .field('requirements', 'Take a shower every day')
      .field('requirements', 'Brush your teeth every day')
    
    await request(app.server)
      .post('/api/pets')
      .set('Cookie', cookies)
      .field('name', 'Big dog')
      .field('about', 'A little dog')
      .field('age', 'old')
      .field('energy', 'low')
      .field('ambient', 'wide')
      .field('size', 'medium')
      .field('independency', 'high')
      .field('requirements', 'Take a shower every day')
      .field('requirements', 'Brush your teeth every day')

    const res = await request(app.server)
      .get('/api/pets')
      .query({ state: 'SC', city: 'Some city' })
      .expect(200)

    expect(res.body).toEqual(expect.objectContaining({
      pets: expect.arrayContaining([
        expect.objectContaining({
          name: 'Big dog'
        }),
        expect.objectContaining({
          name: 'Little dog'
        })
      ])
    }))

    expect(res.body.pets).toHaveLength(2)
  })
  
  it('should be able to filter pets by other fields', async () => {
    const userData: StoreUserRequestBody  = {
      name: 'John Doe',
      role: 'admin',
      email: 'john.doe.admin@mail.com',
      password: '12345678',
      passwordConfirmation: '12345678',

      contact: '(00) 0 0000-0000',

      zipCode: '00000-000',
      street: 'Some street',
      number: '123456',
      neighborhood: 'Some neighborhood',
      city: 'Some city',
      state: 'SC'
    }

    await request(app.server)
      .post('/api/users')
      .send(userData)

    const userRes = await request(app.server)
      .post('/api/auth/sign-in')
      .send({ email: userData.email, password: userData.password })
  
    const cookies = userRes.get('Set-Cookie') ?? []

    await request(app.server)
      .post('/api/pets')
      .set('Cookie', cookies)
      .field('name', 'Little dog')
      .field('about', 'A big dog')
      .field('age', 'old')
      .field('energy', 'low')
      .field('ambient', 'wide')
      .field('size', 'medium')
      .field('independency', 'high')
      .field('requirements', 'Take a shower every day')
      .field('requirements', 'Brush your teeth every day')
    
    await request(app.server)
      .post('/api/pets')
      .set('Cookie', cookies)
      .field('name', 'Big dog')
      .field('about', 'A little dog')
      .field('age', 'puppy')
      .field('energy', 'low')
      .field('ambient', 'wide')
      .field('size', 'medium')
      .field('independency', 'high')
      .field('requirements', 'Take a shower every day')
      .field('requirements', 'Brush your teeth every day')

    const res = await request(app.server)
      .get('/api/pets')
      .query({ state: 'SC', city: 'Some city', age: 'puppy' })
      .expect(200)

    expect(res.body).toEqual(expect.objectContaining({
      pets: expect.arrayContaining([
        expect.objectContaining({
          name: 'Big dog'
        })
      ])
    }))

    expect(res.body.pets).toHaveLength(1)
  })

  it('should be able to get a specific pet data', async () => {
    const userData: StoreUserRequestBody = {
      name: 'John Doe',
      role: 'admin',
      email: 'john.admin.pet@mail.com',
      password: '12345678',
      passwordConfirmation: '12345678',
  
      contact: '(00) 0 0000-0000',
  
      zipCode: '00000-000',
      street: 'Some street',
      number: '123456',
      neighborhood: 'Some neighborhood',
      city: 'Some city',
      state: 'PA'
    }
  
    await request(app.server)
      .post('/api/users')
      .send(userData)
  
    const userRes = await request(app.server)
      .post('/api/auth/sign-in')
      .send({ email: userData.email, password: userData.password })
  
    const cookies = userRes.get('Set-Cookie') ?? []
  
    const petRes = await request(app.server)
      .post('/api/pets')
      .set('Cookie', cookies)
      .field('name', 'Little dog')
      .field('about', 'A big dog')
      .field('age', 'old')
      .field('energy', 'low')
      .field('ambient', 'wide')
      .field('size', 'medium')
      .field('independency', 'high')
      .field('requirements', 'Take a shower every day')
      .field('requirements', 'Brush your teeth every day')

    const res = await request(app.server)
      .get(`/api/pets/${petRes.body.pet.id}`)
      .expect(200)

    expect(res.body).toEqual(expect.objectContaining({
      pet: expect.objectContaining({
        name: 'Little dog'
      })
    }))
  })
})
