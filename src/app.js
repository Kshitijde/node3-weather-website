const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//define paths for expess config
const viewsPAth=path.join(__dirname,'../templates/views') 
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location.
app.set('view engine','hbs')
app.set('views',viewsPAth)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{title:"Weather",name:"Kshitij Deshpande"})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:"About me",name:"Kshitij Deshpande"})
})

app.get('/help',(req,res)=>{
    res.render('help',{message:"save me message",title:'Help',name:'Kshitij Deshpande'})
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"no address provided"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
          })
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:"You must provide a search term!"
        })
    }
    console.log(req.query )
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{message:"Help article not found!",title:"404 page",name :"kshitj"})
})

app.get('*',(req,res)=>{
    res.render('404',{message:"Page not found!",title:"404 page",name:"kshitij"})
})

app.listen(port,()=>{
    console.log('server is up on port'+port)
})