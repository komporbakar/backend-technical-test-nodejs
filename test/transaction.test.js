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
        expect(response.body.data).toBeNull();
    })

})

describe('POST /topup', () => {
    let authToken;

     beforeEach(async () =>{
       authToken = await UserTest.create()
    })

    afterEach(async () =>{
        await UserTest.delete()
        await UserTest.deleteTransaction()
    })

    it('should be able to topup (200)', async () => {
        const response = await supertest(app).post('/topup').send({
            "top_up_amount": 100000
        }).set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.data).toBeDefined();
    })

    it('should rejected to topup if amount not valid (400)', async () => {
        const response = await supertest(app).post('/topup').send({
            "top_up_amount": 0
        }).set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.status).toBe(102)
        expect(response.body.message).toBe("Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0")
        expect(response.body.data).toBeNull();
    })

    it('should rejected to topup if token not valid (401)', async () => {
        const response = await supertest(app).post('/topup').send({
            "top_up_amount": 100000
        }).set({
            "Authorization": `Bearer ${authToken}123`
        })
        logging.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe(108)
        expect(response.body.message).toBe("Token tidak tidak valid atau kadaluwarsa")
        expect(response.body.data).toBeNull();
    })

})

describe('POST /transaction', () => {
    let authToken;

     beforeEach(async () =>{
       authToken = await UserTest.create()
        await UserTest.topup()
    })

    afterEach(async () =>{
        await UserTest.delete()
        await UserTest.deleteTransaction()
    })

    it('should be able to transaction (200)', async () => {
        const response = await supertest(app).post('/transaction').send({
            "service_code": 'PLN'
        }).set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.data).toBeDefined();
    })

    it('should rejected to transaction if service not valid (400)', async () => {
        const response = await supertest(app).post('/transaction').send({
            "service_code": 'PLN12312'
        }).set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.status).toBe(102)
        expect(response.body.message).toBe("Service atau Layanan tidak ditemukan")
        expect(response.body.data).toBeNull();
    })

    it('should rejected to transaction if token not valid (401)', async () => {
        const response = await supertest(app).post('/transaction').set({
            "Authorization": `Bearer ${authToken}123`
        }).send({
            "service_code": 'PLN'
        })

        logging.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe(108)
        expect(response.body.message).toBe("Token tidak tidak valid atau kadaluwarsa")
        expect(response.body.data).toBeNull();
    })
})

const createTransaction = async (authToken) => {
    return await supertest(app)
        .post('/transaction')
        .send({ "service_code": 'PLN' })
        .set({ "Authorization": `Bearer ${authToken}` });
};

describe("GET /transaction/history", () => {
     let authToken;

     beforeEach(async () =>{
       authToken = await UserTest.create()
        await UserTest.topup()
         for (let i = 0; i < 3; i++) {
            await createTransaction(authToken)
        }
    })

    afterEach(async () =>{
        await UserTest.delete()
        await UserTest.deleteTransaction()
    })

    it('should be able to get transaction history (200)', async () => {

        const response = await supertest(app).get('/transaction/history').set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.data.offset).toBe(0);
        expect(response.body.data.limit).toBe(3);
        expect(response.body.data.records).toBeDefined();
    })

    it('should be able to get transaction history with query limit (400)', async () => {

        const response = await supertest(app).get('/transaction/history?limit=2').set({
            "Authorization": `Bearer ${authToken}`
        })
        logging.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.status).toBe(0)
        expect(response.body.data.offset).toBe(0);
        expect(response.body.data.limit).toBe(2);
        expect(response.body.data.records.length).toBe(2);
    })

    it('should rejected to get transaction history if token not valid (401)', async () => {
        const response = await supertest(app).get('/transaction/history').set({
            'authorization': `Bearer ${authToken}123`
        })
        logging.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.status).toBe(108)
        expect(response.body.message).toBe("Token tidak tidak valid atau kadaluwarsa")
        expect(response.body.data).toBeNull();
    })
})
