const express = require('express')
const router = express.Router()

// import database
const koneksi = require('../config/database')

//insert data dan validasi
const {body, validationResult}=require('express-validator')


// membaca data
router.get('/', function(req,res){
    koneksi.query('SELECT * FROM music ORDER BY id desc', function(error, rows){
        if(error) {
            return res.status(500).json({
                status:false,
                message:'database tidak nyambung',
            })
        }
        else {
            return res.status(200).json({
                status:true,
                message:'menampilkan data tabel music',
                data: rows
            })
        }
    })
})

//insert data
router.post('/music',
    [
        body('nama_band').notEmpty(),
        body('produser').notEmpty(),
        body('anggota').notEmpty(),
        body('tahun_terbentuk').notEmpty(),
        body('vokalis').notEmpty(),
        body('gendre').notEmpty(),
        body('nama_album').notEmpty(),
        body('judul_lagu').notEmpty(),

    ],(req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array})
        }

        //mendefinisikan formData
        let formData = {
            nama_band: req.body.nama_band,
            produser: req.body.produser,
            anggota: req.body.anggota,
            tahun_terbentuk: req.body.tahun_terbentuk,
            vokalis: req.body.vokalis,
            gendre: req.body.gendre,
            nama_album: req.body.nama_album,
            judul_lagu: req.body.judul_lagu,
        }

        //masukkan data / query
        koneksi.query('INSERT INTO music SET ?', formData,
            function(err,rows){
                if(err){
                    return res.status(500).json({
                        status: false,
                        message: 'Error System',
                    })
                }else{
                    return res.status(201).json({
                        status: true,
                        message: 'Success input datat',
                        data: rows[0]
                    })
                }
            }
        )
    })

    //Detail
router.get('/:id', function(req,res){
    let id = req.params.id

    koneksi.query(`SELECT * FROM music WHERE ID=${id}`,
        function(error, rows){
            if(error){
                return res.status(500).json({
                    status:false,
                    message:'Server Error'
                })
            }

            //pencarian posts
            if(rows.length <= 0){
                return res.status(404).json({
                    status: false,
                    message: 'Data tidak ada'
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'menampilkan data posts',
                    data: rows[0],
                })
            }
        }
     )

})

// Update
router.patch('/update/:id',[
    //validasi
    body('nama_band').notEmpty(),
    body('produser').notEmpty(),
    body('anggota').notEmpty(),
    body('tahun_terbentuk').notEmpty(),
    body('vokalis').notEmpty(),
    body('gendre').notEmpty(),
    body('nama_album').notEmpty(),
    body('judul_lagu').notEmpty(),
],(req,res)=>{
    const errors = validationResult (req)
    if(!errors.isEmpty()){
        return res.status(442).json({
            errors:errors.array()
        })
    }

    //id
    let id = req.params.id

    //data post
    let formData={
        nama_band: req.body.nama_band,
        produser: req.body.produser,
        anggota: req.body.anggota,
        tahun_terbentuk: req.body.tahun_terbentuk,
        vokalis: req.body.vokalis,
        gendre: req.body.gendre,
        nama_album: req.body.nama_album,
        judul_lagu: req.body.judul_lagu,
    }

    // update query
    koneksi.query(`UPDATE music set ? WHERE id=${id}`,
       formData,function(error,rows){
        if(error){
            return res.status(500).json({
                status: false,
                message: 'server error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Berhasil update data'
            })
        }
       } 
    )
})

//Delete
router.delete('/delete/(:id)',
    function(req,res){
        let id = req.params.id

        koneksi.query(`DELETE FROM music WHERE id=${id}`,
            function(error,rows){
                if(error) {
                    return res.status(500).json({
                        status: false,
                        message: 'Server error'
                    })
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'data sudah dihapus'
                    })
                }
            }
        )
    })
module.exports = router