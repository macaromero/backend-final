const classP = require("../../models/DAO/products");
const classProducts = new classP;
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const create = async (req, res) => {
    let data = req.body;
    let imagen = [];
    let color = data.color.split(", ") || data.color.split(",");
    let talle = [];
    let talleArray = data.talle.split(", ") || data.talle.split(",");
    let imagenAlt = data.imagenAlt.split(", ") || data.imagenAlt.split(",");
    
    req.files.map(i => imagen.push(i.path));
    talleArray.map(t => talle.push(Number(t)))

    data = {
        nombre: data.nombre,
        color,
        talle,
        imagen,
        imagenAlt,
        id_categoria: data.id_categoria,
        categoria: data.categoria,
        precio: data.precio,
        stock: data.stock
    }

    try {
        const product = await classProducts.save(data);

        if (product) {
            res.status(200).json({
                "Status": "Ok",
                "Producto": product
            });
        } else {
            loggerWarning.error(`Ya existe un producto con el nombre ${data.nombre} o te faltó ingresar algún dato`);
            res.status(500).json(`Ya existe un producto con el nombre ${data.nombre} o te faltó ingresar algún dato`);
        }
        
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar crear el producto: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar crear el producto: ${error}`);
    };
};

const modifyProduct = async (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;

    try {
        const product = await classProducts.modify(id, data);

        if (product != undefined) {
            res.status(200).json({
                "Status": "Ok",
                "Producto": product
            });
        } else {
            loggerWarning.error(`No se encontró producto con el id ${id}`);
            res.status(404).json(`No se encontró producto con el id ${id}`);
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar modificar los datos del producto con id ${id}: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar modificar los datos del producto con id ${id}: ${error}`);
    };
};

const deleteProduct = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const product = await classProducts.deleteById(id);
        if (product.modifiedCount != 0) {
            res.status(200).json({
                "Status": "Ok",
                "Response": product
            });
        } else {
            loggerWarning.error(`No se encontró producto con el id ${id}`);
            res.status(404).json(`No se encontró producto con el id ${id}`);
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar eliminar el producto con id ${id}: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar eliminar el producto con id ${id}: ${error}`);
    };
};



module.exports = {
    create,
    modifyProduct,
    deleteProduct
};