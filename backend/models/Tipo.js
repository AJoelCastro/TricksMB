class Tipo{
    constructor(idTipo, nombre){
        this._idTipo = idTipo;
        this._nombre = nombre;
    }

    get idTipo(){
        return this._idTipo;
    }

    set idTipo(value){
        if(typeof value !== 'number' || value <= 0){
            throw new Error('El id del tipo debe ser un número positivo');
        }
        this._idTipo = value;
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