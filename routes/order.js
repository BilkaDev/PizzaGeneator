const express = require('express');
const {handlebarsHelpers} = require("../handlebars-helpers");
const {PIZZA_ADDONS} = require("../data/pizza-data");

const orderRouter = express.Router();

orderRouter
    .get('/',(req, res) => {
        const pizzaAddons = req.cookies['pizza-addons'];

        const sum =(pizzaAddons[0] === undefined) ? 0 : pizzaAddons.reduce((prev, cur) =>{
            return prev + handlebarsHelpers['find-price'](Object.entries(PIZZA_ADDONS), cur);
        },0)
        if(pizzaAddons[0] === undefined){
            res.redirect('/')
            return

        }


        res.render('order/card',{
            pizzaAddons,
            addons: Object.entries(PIZZA_ADDONS),
            sum,


        });

    })
    .get('/pay',(req, res) => {
    const pizzaAddons = req.cookies['pizza-addons'];

    const sum =(pizzaAddons[0] === undefined) ? 0 : pizzaAddons.reduce((prev, cur) =>{
        return prev + handlebarsHelpers['find-price'](Object.entries(PIZZA_ADDONS), cur);
    },0)
    if(pizzaAddons[0] === undefined){
        res.redirect('/')
        return

    }

        res.clearCookie('pizza-addons');

        res.render('order/thanks',{
            sum,




        });


});

module.exports ={
    orderRouter,
}