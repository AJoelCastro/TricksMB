class Almacen{
    constructor(idAlmacen,idTipoAlmacen){
        this._idAlmacen = idAlmacen;
        this._idTipoAlmacen = idTipoAlmacen;
    }

    get idAlmacen(){
        return this._idAlmacen;
    }  

    set idAlmacen(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del almacen debe ser un numero positivo');
        }
    }

    get idTipoAlmacen(){
        return this._idTipoAlmacen;
    }

    set idTipoAlmacen(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del tipo de almacen debe ser un numero positivo');
        }
    }
}

module.exports = Almacen;