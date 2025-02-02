class Producto{
    constructor(idProducto, idModelo){
        this._idProducto = idProducto;
        this._idModelo = idModelo;
    }

    get idProducto(){
        return this._idProducto;
    }

    set idProducto(value){
        if(typeof value !== 'number' || value <= 0){
            throw new Error('El id del producto debe ser un número positivo');
        }
        this._idProducto = value;
    }

    get idModelo(){
        return this._idModelo;
    }

    set idModelo(value){
        if(typeof value !== 'number' || value <= 0){
            throw new Error('El id del modelo debe ser un número positivo');
        }
        this._idModelo = value;
    }
}

module.exports = Producto;