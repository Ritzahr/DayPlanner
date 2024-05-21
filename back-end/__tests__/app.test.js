const express = require("express");
const app = require('../app')
const connection = require('../index')
const seed = require('../seed.mongodb')
const request = require('supertest')


beforeEach(() => seed())

describe('GET /sights/:sight_id', () => {
    test('returns the correct user object matching the user id given', () => {
        return request(app)
        .get('/api/sights/25475389')
        .expect(200)
        .then(({body}) => {
            const sights = body
            expect(sights).toEqual(expect.objectContaining({
                "id": 25475389,
                "lat": 51.5265807,
                "lon": -0.1292505,
                "tags": {
                  "amenity": "cafe",
                  "name": "Woburn Cafe"
            }
        }))
        })
    })
    test('404: returns a not found error when passed a valid but non-existent id', (() => {
        return request(app)
        .get('/api/sights/230')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('not found')
        })
    }))
    test('400: returns a bad request when passed an invalid id', (() => {
        return request(app)
        .get('/api/sights/peanuts')
        .expect(400)
        .then(({body}) => {  
            expect(body.msg).toBe('bad request')
        })
    }))
})
describe('GET /api/users', () => {
    test('returns status 200 whenall users found', () => {
        return request(app)
        .get('/api/users')
    })
})

