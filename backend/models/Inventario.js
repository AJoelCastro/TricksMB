class Inventario{
    constructor(idInventario,idAlmacen)
    {
        this._idInventario = idInventario;
        this._idAlmacen = idAlmacen;
    }

    get idInventario(){
        return this._idInventario;
    }

    set idInventario(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del inventario debe ser un numero positivo');
        }
    }

    get idAlmacen(){
        return this._idAlmacen;
    }

    set idAlmacen(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del almacen debe ser un numero positivo');
        }
    }
}

module.exports = Inventario;