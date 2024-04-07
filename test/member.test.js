import supertest from "supertest";
import { app } from '../src/index';
import { logging } from "../src/utils/logging";
import { UserTest } from "./util-test";

describe("POST /registration", () => {
    afterEach(async () =>{
        await UserTest.delete()
    })
    it("should be able to register (200)", async () => {
        const response = await supertest(app).post('/registration').send({
            "email": "test@test.com",
            "first_name": "test",
            "last_name": "aja",
            "password": "rahasia123"
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.message).toBe("Registrasi berhasil silahkan login")
    })

    it("should rejected to register if email not valid (400)", async () => {
         const response = await supertest(app).post('/registration').send({
            "email": "test@test",
            "first_name": "test",
            "last_name": "aja",
            "password": "rahasia123"
        })
        logging.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.status).toBe(102)
    })
})

describe("POST /login", () => {
    beforeEach(async () =>{
        await UserTest.create()
    })

    afterEach(async () =>{
        await UserTest.delete()
    })

    it('should be able to login (200)', async () => {
        const response = await supertest(app).post('/login').send({
            "email": "test@test.com",
            "password": "rahasia123"
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.message).toBe("Login Berhasil")
        expect(response.body.data.token).toBeDefined();
    })

    it('should rejected to login if email not valid (400)', async () => {
        const response = await supertest(app).post('/login').send({
            "email": "test@test",
            "password": "rahasia123"
        })
        logging.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.status).toBe(102)
        expect(response.body.message).toBe("Paramter email tidak sesuai format")
    })

    it('should rejected to login if password not valid (401)', async () => {
        const response = await supertest(app).post('/login').send({
            "email": "test@test.com",
            "password": "rahasia456"
        })
        logging.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe(103)
        expect(response.body.message).toBe("Username atau password salah")
    })
})

describe("GET /profile", () => {
    let authToken;

     beforeEach(async () =>{
       authToken = await UserTest.create()
    })

    afterEach(async () =>{
        await UserTest.delete()
    })

    it('should be able to get profile (200)', async () => {
        const response = await supertest(app).get('/profile').set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.data).toBeDefined();
    })

    it('should rejected to get profile if token not valid (401)', async () => {
        const response = await supertest(app).get('/profile').set({
            "Authorization": `Bearer ${authToken}123`
        })
        logging.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe(108)
        expect(response.body.message).toBe("Token tidak tidak valid atau kadaluwarsa")
    })
})

describe('PUT /profile/update', () => {
    let authToken;

     beforeEach(async () =>{
       authToken = await UserTest.create()
    })

    afterEach(async () =>{
        await UserTest.delete()
    })

    it('should be able to update profile (200)', async () => {
        const response = await supertest(app).put('/profile/update').set({
            "Authorization": `Bearer ${authToken}`
        }).send({
            "first_name": "test",
            "last_name": "doang",
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.message).toBe("Update Pofile berhasil")
    })

    it('should rejected to update profile if token not valid (401)', async () => {
        const response = await supertest(app).put('/profile/update').set({
            "Authorization": `Bearer ${authToken}123`
        }).send({
            "first_name": "test",
            "last_name": "doang",
        })
        logging.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe(108)
        expect(response.body.message).toBe("Token tidak tidak valid atau kadaluwarsa")
    })
})