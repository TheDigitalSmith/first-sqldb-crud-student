const express = require ('express');
const app = express ();
const dotenv = require ('dotenv');
dotenv.config();


const studentsService = require ('./src/services/students/index');

app.use(express.json());
app.use('/students', studentsService);
app.listen(process.env.PORT,()=>{
    console.log(`Your server is launch at launchpad ${process.env.PORT}`);
})