import express from "express"
const PORT = 4000
const app = express()
app.use(express.json())
app.use(cors)

app.get("/",()=> {
    res.json(`Home API fetch`)
})
app.listen(PORT , () => console.log(`Server Running on http://localhost:{PORT}`))