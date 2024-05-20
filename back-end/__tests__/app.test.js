const express = require("express");
const app = require('../app')
const connection = require('../index')
const seed = require('../seed.mongodb')
const request = require('supertest')


beforeEach(() => seed())

describe('GET /sights/:sight_id', () => {
    test('returns 200 status', () => {
        return request(app)
        .get('/sights/')
    })
})

