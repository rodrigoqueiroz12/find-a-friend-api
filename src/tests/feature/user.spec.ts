import request from 'supertest'

import { app } from '@/app'
import { StoreUserRequestBody } from '@/app/http/requests/store-user.request'

describe('user feature tests', () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an admin user and its address', async () => {
    const data: StoreUserRequestBody = {
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

    const res = await request(app.server)
      .post('/api/users')
      .send(data)
      .expect(204)
    
    expect(res.body).toEqual('')
  })

  it('should not be able to register an user with an email that already exists', async () => {
    const data: StoreUserRequestBody = {
      name: 'John Doe',
      email: 'john.doe-1@mail.com',
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
      .send(data)
      .expect(204)

    const res = await request(app.server)
      .post('/api/users')
      .send(data)
      .expect(400)
    
    expect(res.body).toEqual(expect.objectContaining({
      message: 'E-mail already exists'
    }))
  })
})
