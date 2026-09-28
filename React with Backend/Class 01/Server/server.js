import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const PORT = 5000
const app = express()
app.use(express())
app.use(cors())

app.get("/", (req,res)=>{
res.json(`Server running on http://localhost:${PORT}`)
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))