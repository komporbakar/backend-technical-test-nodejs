const supertest = require("supertest");
const { UserTest } = require("./util-test");
const { app } = require("../src");
const { logging } = require("../src/utils/logging");


describe("GET /banner", () => {
    let authToken;

     beforeEach(async () =>{
       authToken = await UserTest.create()
    })

    afterEach(async () =>{
        await UserTest.delete()
    })

    it('should be able to get banner (200)', async () => {
        const response = await supertest(app).get('/banner').set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.data).toBeDefined();
    })

    it('should rejected to get banner if token not valid (401)', async () => {
        const response = await supertest(app).get('/banner').set({
            "Authorization": `Bearer ${authToken}123`
        })
        logging.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe(108)
        expect(response.body.message).toBe("Token tidak tidak valid atau kadaluwarsa")
    })
})

describe('GET /services', () => {
   let authToken;

     beforeEach(async () =>{
       authToken = await UserTest.create()
    })

    afterEach(async () =>{
        await UserTest.delete()
    })

    it('should be able to get services (200)', async () => {
        const response = await supertest(app).get('/services').set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.data).toBeDefined();
    })

    it('should rejected to get services if token not valid (401)', async () => {
        const response = await supertest(app).get('/services').set({
            "Authorization": `Bearer ${authToken}123`
        })
        logging.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe(108)
        expect(response.body.message).toBe("Token tidak tidak valid atau kadaluwarsa")
    })
})
