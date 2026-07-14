// import express from "express"

// const PORT = 5000;

// const obj ={
//     "name" : "Mudassir",
//     "age" : 25
// }


// const app = express()
// // app.get("url",callback )
// app.get("/", (request,response)=>{
//     // response.send(`Server running...`)
//         // response.send(obj)
//         response.json(obj)

// } )
// app.get("/create-user1", (request,response)=>{
//     // response.send(`Server running...`)
//         // response.send(obj)
//         response.json(`User1 added!`)

// } )
// app.get("/create-user2", (request,response)=>{
//     // response.send(`Server running...`)
//         // response.send(obj)
//         response.json(`User2 created!`)

// } )
// app.get("/create-user3", (request,response)=>{
//     // response.send(`Server running...`)
//         // response.send(obj)
//         response.json(`User3 created!`)

// } )
// app.get("/create-user4", (request,response)=>{
//     // response.send(`Server running...`)
//         // response.send(obj)
//         response.json(`User4 created!`)

// } )




// app.listen(PORT,()=>console.log(`server running on http://localhost:${PORT}`))



import express from "express"

const PORT = 5000;
const app = express()


app.get("/",(request,response)=>{
    response.send(`server running`)
})


app.post("/create-user", (request,response)=>{
    response.send(`User created!`)
})


app.put("/update-user", (request,response)=>{
    response.send(`User updated!`)
})

app.delete("/delete-user", (request,response)=>{
    response.send(`User deleted!`)
})

app.listen(PORT,()=>console.log(`server running on localhost:${PORT}`))



