class Qr{
    constructor(idQr, qr){
        this._idQr = idQr;
        this._qr = qr;
    }

    get idQr(){
        return this._idQr;
    }

    set idQr(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del qr debe ser un numero positivo');
        }
    }

    get qr(){
        return this._qr;
    }

    set qr(value){
        if(typeof value === 'string' && value.trim() !== ''){
            this._qr = value;
        }else{
            throw new Error('El qr debe ser un string no vacio');
        }
    }
}

module.exports = Qr;