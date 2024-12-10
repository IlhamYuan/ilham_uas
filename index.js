const express = require('express')
const app = express()
const port = 3000
// import body parser
const bodyParser = require('body-parser')


app.get('/', (req, res) =>{
    const html = `
    <!DOCTYPE html>
<link href="https://fonts.googleapis.com/css?family=Creepster" rel="stylesheet">

<link rel="icon" type="image/png" href="https://5.top4top.net/p_1447wtdub0.jpg" type="image/x-icon"/>

<link href="https://fonts.googleapis.com/css?family=Iceberg" rel='stylesheet' type='text/css'>

<link href="http://fonts.googleapis.com/css?family=Black+Ops+One|Montserrat|Cabin+Sketch|Orbitron|Architects+Daughter|Permanent+Marker|Luckiest+Guy|Cherry+Cream+Soda" rel="stylesheet" />

<center><img src="https://media.giphy.com/media/pKeoUfDf7YMyk/giphy.gif" width="963"/></center>
  <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Hero Mobile Legend</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                color: black; /* Mengubah warna teks agar kontras dengan latar belakang */
                background-color : black
            }
            h1 {
                color: black; /* Warna teks untuk judul */
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                color: white;
                background-color: #007bff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
       
        <button onclick="window.location.href='/api/music'">Ayoo Sini!!!!!</button>
    </body>`
    res.send(html)
})

//insert, edit, delete
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//import route posts
const postsrouter = require('./routes/music')
app.use('/api/music', postsrouter)

app.listen(port, ()=>{
    console.log(`Aplikasi Ini Berjalan Di http://localhost:${port}`)
})