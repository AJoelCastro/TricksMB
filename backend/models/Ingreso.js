class Ingreso{
    constructor(idIngreso,idAlmacen,idQr){
        this._idIngreso = idIngreso;
        this._idAlmacen = idAlmacen;
        this._idQr = idQr;
    }

    get idIngreso(){
        return this._idIngreso;
    }

    set idIngreso(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del ingreso debe ser un numero positivo');
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

    get idQr(){
        return this._idQr;
    }

    set idQr(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del qr debe ser un numero positivo');
        }
    }
}

module.exports = Ingreso;