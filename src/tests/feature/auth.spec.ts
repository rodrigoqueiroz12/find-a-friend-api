import request from 'supertest'

import { app } from '@/app'

describe('auth feature tests', () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  it('should be able to sign in', async () => {
    const data = {
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

    await request(app.server).post('/api/users').send(data)

    const res = await request(app.server).post('/api/auth/sign-in')
      .send({ email: data.email, password: data.password })
      .expect(200)

    expect(res.body).toEqual(expect.objectContaining({
      token: expect.any(String)
    }))
  })

  it('should be able to refresh a token', async () => {
    const data = {
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

    await request(app.server).post('/api/users').send(data)

    const signInRes = await request(app.server).post('/api/auth/sign-in')
      .send({ email: data.email, password: data.password })
      .expect(200)

    const cookies = signInRes.get('Set-Cookie') ?? []

    const res = await request(app.server)
      .patch('/api/auth/token/refresh')
      .set('Cookie', cookies)
      .send()
      .expect(200)

    expect(res.body).toEqual(expect.objectContaining({
      token: expect.any(String)
    }))

    expect(res.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })

  it('should be able to get the logged user profile', async () => {
    const data = {
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

    await request(app.server).post('/api/users').send(data)

    const authRes = await request(app.server).post('/api/auth/sign-in')
      .send({ email: data.email, password: data.password })
      .expect(200)

    const cookies = authRes.get('Set-Cookie') ?? []

    const res = await request(app.server)
      .get('/api/auth/me')
      .set('Cookie', cookies)
      .send()
      .expect(200)

    expect(res.body).toEqual(expect.objectContaining({
      user: expect.objectContaining({
        email: data.email
      })
    }))
  })
})