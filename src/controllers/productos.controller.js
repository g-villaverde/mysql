import knex from "knex";
import {Producto} from "../models/Productos.js";
import options from "../options/mysql.js"


let sql = knex(options);


const productos = [];

sql.schema.createTable('productos', table => {
    table.string('nombre'),
    table.string('descripcion'),
    table.integer('codigo'),
    table.string('foto'),
    table.integer('precio'),
    table.integer('stock');
})
    .then(()=> console.log("table created"))
    .catch((err) => {console.log(err); throw err})
    .finally(() => {knex.distroy} )

// Get table

export const getProductos = (req, res) => {

    let result = sql.from('productos').select('*');

    return res.status(200).json(result);
}

export const addProducto = (req, res) => {

    
    const {id, timestamp, nombre, descripcion, codigo, foto, precio, stock} = req.body;

    const newProducto = new Producto(id, timestamp, nombre, descripcion, codigo, foto, precio, stock);
    productos.push(newProducto);
 
    let dataToFile = sql('productos').insert(newProducto);

    
    return res.status(201).json(dataToFile);

};

export const updateProducto = (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, codigo, foto, precio, stock} = req.body;

    const producto = producto.find((producto)=> producto.id == id);
    if(!producto) {
        return res.status(404).json({msg: "producto no encontrado"});
    }
    (producto.nombre = nombre),
        (producto.descripcion = descripcion),
        (producto.codigo = codigo),
        (producto.foto = foto),
        (producto.prcio = precio),
        (producto.stock = stock);

    
    let updated = () => {sql
                    .from('productos', id)
                    .select('*')
                    .where('id', '=', id)
                    .update(items);
                return sql.from('productos').select('*')
    }

    res.status(200).json(updated)

};

export const deleteProducto = (req, res) => {

    const {id} = req.params;

    const producto = productos.find((producto)=> producto.id == id);
    if(!producto) {
        return res.status(404).json({msg: "producto no encontrado"});
    }
    this.sql.remove = async('productos', id) => {
        try {
            let removed = await sql
                .from('productos')
                .select('*')
                .where('id', '=', id)
                .del();
            return removed || false;
        } catch (error) {
            console.log(error);
        }
    }

    const index = productos.findIndex((producto) => producto.id == id);
    producto.splice(index, 1);

    res.status(200).end();

}







