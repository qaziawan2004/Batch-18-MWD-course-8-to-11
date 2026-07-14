console.log("Mudassir Awan");

import http from "http";
import fs from "fs";
const PORT = 3000;

 const Users = {
            name:  "Mudassir",
            email: "qaziawan@gmail.com",
            password: 123456,
        };
const server = http.createServer((req, res) => {
    if (req.url === "/") {
       
        fs.writeFileSync("userData", JSON.stringify(Users));
        res.end(`Welcome ${Users.name}`);

    }
});
server.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));



