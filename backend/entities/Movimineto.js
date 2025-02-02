class Movimiento{
    constructor(idMovimiento,idAlmacen,idTipoMovimiento,fechaMoviemiento){
        this._idMovimiento = idMovimiento;
        this._idAlmacen = idAlmacen;
        this._idTipoMovimiento = idTipoMovimiento;
        this._fechaMovimiento = fechaMoviemiento;
    }

    get idMovimiento(){
        return this._idMovimiento;
    }

    set idMovimiento(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del movimiento debe ser un numero positivo');
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

    get idTipoMovimiento(){
        return this._idTipoMovimiento;
    }

    set idTipoMovimiento(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del tipo de movimiento debe ser un numero positivo');
        }
    }

    get fechaMovimiento(){
        return this._fechaMovimiento;
    }

    set fechaMovimeinto(value){
        if (value instanceof Date && !isNaN(value)) {
            throw new Error('La fecha de movimiento debe ser una fecha valida');
        }

        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0); // Normaliza la fecha actual (ignora la hora)
        
        const valueNormalizado = new Date(value);
        valueNormalizado.setHours(0, 0, 0, 0); // Normaliza la fecha proporcionada

        if (valueNormalizado.getTime() !== fechaActual.getTime()) {
            throw new Error('La fecha de movimiento debe ser la fecha actual');
        }
    }
}

module.exports = Movimiento;