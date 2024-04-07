const supertest = require("supertest");
const { UserTest } = require("./util-test");
const { app } = require("../src");
const { logging } = require("../src/utils/logging");


describe("GET /balance", () => {
    let authToken;

     beforeEach(async () =>{
       authToken = await UserTest.create()
    })

    afterEach(async () =>{
        await UserTest.delete()
    })

    it('should be able to get balance (200)', async () => {
        const response = await supertest(app).get('/balance').set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.data).toBeDefined();
    })

    it('should rejected to get balance if token not valid (401)', async () => {
        const response = await supertest(app).get('/balance').set({
            "Authorization": `Bearer ${authToken}123`
        })
        logging.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe(108)
        expect(response.body.message).toBe("Token tidak tidak valid atau kadaluwarsa")
    })

})
