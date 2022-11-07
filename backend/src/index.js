require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
require('./middlewares/auth');
const { log4js } = require('./middlewares/logger');
const logger = log4js.getLogger();
const loggerError = log4js.getLogger('error');
const productsRoute = require('./routes/products');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const usersRoute = require('./routes/users');
const orderRoute = require('./routes/orders');
const categoriesRoute = require('./routes/categories');
const adminLoginRoute = require('./routes/admin/admin_login');
const adminRegisterRoute = require('./routes/admin/admin_register');
const adminRoute = require('./routes/admin/admin');
const adminProductsRoute = require('./routes/admin/admin_products');
const adminCategoriesRoute = require('./routes/admin/admin_categories');
const adminOrdersRoute = require('./routes/admin/admin_orders');
const adminUsersRoute = require('./routes/admin/admin_users');
const notFoundRoute = require('./routes/main');
const { mongoConnection } = require('./config/mongoDB');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: process.env.SESSION_RESAVE,
    saveUninitialized: process.env.SESSION_SAVEUNINITIALIZED,
    cookie: {
        maxAge: 60000 || process.env.SESSION_MAXAGE
    }
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());

app.use("/products", productsRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/user", usersRoute);
app.use("/order", orderRoute);
app.use("/categories", categoriesRoute);
app.use("/admin/login", adminLoginRoute);
app.use("/admin/register", adminRegisterRoute);
app.use("/admin", adminRoute);
app.use("/admin/product", adminProductsRoute);
app.use("/admin/category", adminCategoriesRoute);
app.use("/admin/orders", adminOrdersRoute);
app.use("/admin/users", adminUsersRoute);
app.use("/*", notFoundRoute);

app.listen(process.env.PORT || PORT, async () => {
    await mongoConnection();
    
    try {
        logger.info(`Servidor corriendo en puerto ${process.env.PORT || PORT}`);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar conectarse al servidor: ${error}`);
    };  
});