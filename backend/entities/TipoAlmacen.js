class TipoAlmacen{
    constructor(idTipoAlmacen,nombre){
        this._idTipoAlmacen = idTipoAlmacen;
        this._nombre = nombre;
    }

    get idTipoAlmacen(){
        return this._idTipoAlmacen;
    }

    set idTipoAlmacen(value){
        if(typeof value !== 'number' || value <= 0){
            throw new Error('El id del tipo de almacen debe ser un número positivo');
        }
        this._idTipoAlmacen = value;
    }

    get nombre(){
        return this._nombre;
    }

    set nombre(value){
        if(typeof value === 'string' && value.trim() !== ''){
            this._nombre = value;
        }else{
            throw new Error('El nombre debe ser un string no vacío');
        }
    }
}

module.exports = TipoAlmacen;