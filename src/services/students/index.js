const express = require ('express');
const router = express.Router();
const db = require ('../../../db');
// const { Client } = require ('pg');
// const client = new Client()

router.get('/',async (req,res)=>{
    // await client.connect();
    const response = await db.query(`SELECT * FROM students`);
    res.send({
        students:response.rows,
        count: response.rowCount
    });
})

router.get('/:id',async (req,res)=>{
    const response = await db.query ( `SELECT * FROM students WHERE _id = $1`, [req.params.id]);
    console.log(response);
    if (response.rowCount > 0){
        res.send(response.rows[0]);
    }else{
        res.status(404).send('student not found')
    }
})


router.post('/',async(req,res)=>{
    const request = await db.query(`INSERT INTO students (firstName, lastName, email, dateOfBirth) 
                                    VALUES ($1,$2,$3,$4) 
                                    RETURNING *`,
    [req.body.firstName, req.body.lastName, req.body.email, req.body.dateOfBirth]);
    res.send(request.rows);
})

router.put('/:id', async (req,res)=>{
    const edit = await db.query (
        `UPDATE Students
        SET firstName = $1,
        lastName = $2,
        email = $3,
        dateOfBirth =$4
        WHERE _id = $5
        RETURNING *`,
        [req.body.firstName, req.body.lastName, req.body.email,req.body.dateOfBirth, req.params.id]);
        if (edit.rowCount > 0){
            res.send(edit.rows[0]);
        }else{
            res.status(404).send('student not found');
        }
})

router.delete('/:id', async (req,res)=>{
    const response = await db.query(`DELETE FROM students WHERE _id = $1`,[req.params.id]);
    if(response.rowCount > 0) {
    res.send("Removed");
    } else{
        res.status(404).send('student not found');
    }
})
module.exports = router