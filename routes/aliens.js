const express =  require ('express')
const router = express.Router()
const Alien = require('./models/alien')

router.get('/', async(req, res)=> {
   try{
      const aliens = await Alien.find()
      res.json(aliens)
   }catch(err){
    res.send('Error' + err)
   }
})

router.get('/:id', async(req, res)=> {
    try{
       const aliens = await Alien.findById(req.params.id)
       res.json(aliens)
    }catch(err){
     res.send('Error' + err)
    }
 })



router.post('/', async(req,res)=>{
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })
    try{
         const a1=  await alien.save()
         res.json(a1)
    }catch(err)
    {
        res.send('Error')
    }
})
router.patch('/:id', async(req,res) =>{
    try{
       const alien = await Alien.findById(req.params.id)
       alien.sub  = req.body.sub
       const a1 = await alien.save()
       res.json(a1)
    }catch(err){
        res.send('Error')
    }
})
router.delete('/:id', async(req,res) =>{
    try{
        const alien = await Alien.findById(req.params.id)
        delete alien[req.body.sub]
        delete alien[req.body.name]
        delete alien[req.body.tech]
        const a1 = await alien.delete()
        res.send(`Deleted alien with ID ${req.body.id}`)
     }catch(err){
        res.send(`Failed to find alien with ID ${req.body.id}`)
     }
})


module.exports = router