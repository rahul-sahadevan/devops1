const test = require("node:test")
const asserts = require("node:assert/strict")
const request = require("supertest")


// get the js file which is having APIs
const app = require("../app")

// api calls using the test or super test
test("GET / return the server health status",async()=>{
    const response = await request(app).get("/")

    // get the response
    asserts.equal(response.status,200)
    asserts.equal(response.text,"Server is UP and running")
})

test("GET /check-user check the user",async()=>{
    const response = await request(app).get("/check-user")

    // get the response
    asserts.equal(response.status,200)
    asserts.equal(response.text,"checking the user")
})

test("GET /unknow returns 404",async()=>{
    const response = await request(app).get("/unknown")

    // get the response
    asserts.equal(response.status,404)
    asserts.equal(response.text,"API request failed with 404")
})


test("POST /add-user check the add user API",async()=>{

    const payload = {
        username:"rahu1",
        email:"rahultest@gmail.com",
        password:"123456"
    }
    const response = await request(app).post("/adduser").send(payload)

    asserts.equal(response.status,201)
    asserts.deepStrictEqual(response.body.data,payload)
})