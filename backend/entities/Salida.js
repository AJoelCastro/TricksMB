class Salida {
    constructor(idSalida, almacenId, qrId) {
        this._idSalida = idSalida;          
        this._almacenId = almacenId;        
        this._qrId = qrId;                  
    }

    get idSalida() {
        return this._idSalida;
    }

    set idSalida(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('El id de la salida debe ser un numero positivo');
        }
    }

    get almacenId() {
        return this._almacenId;
    }

    set almacenId(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('El id del almacen debe ser un numero positivo');
        }
    }

    get qrId() {
        return this._qrId;
    }

    set qrId(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('El id del qr debe ser un numero positivo');
        }
    }
}

module.exports = Salida;