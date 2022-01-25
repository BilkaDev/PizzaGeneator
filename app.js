const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const {homeRouter} = require("./routes/home");
const {orderRouter} = require("./routes/order");
const {handlebarsHelpers} = require("./handlebars-helpers");


const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true,
}));




app.engine('.hbs', hbs.engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');



app.use('/', homeRouter);
app.use('/card', orderRouter);














app.listen(3000);