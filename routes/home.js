const express = require('express');
const {PIZZA_ADDONS} = require('../data/pizza-data')
const {handlebarsHelpers} = require("../handlebars-helpers");

const homeRouter = express.Router();

homeRouter
    .post('/',(req, res) => {

        res.cookie('pizza-addons', req.body,{
            maxAge: 1000*60*60*24,
            httpOnly: true,
        })
        res.end();



    })
    .get('/getCookies',(req, res) => {
        res.json(req.cookies)
        res.end();
    })

    .get('/',(req, res) => {
        const pizzaAddons = req.cookies['pizza-addons'];
        const sum =(pizzaAddons === undefined) ? 0 : pizzaAddons.reduce((prev, cur) =>{
                return prev + handlebarsHelpers['find-price'](Object.entries(PIZZA_ADDONS), cur);
            },0)





        res.render('home',{
        pizzaAddons,
        addons: Object.entries(PIZZA_ADDONS),
            sum,


    });
});


module.exports ={
    homeRouter
}