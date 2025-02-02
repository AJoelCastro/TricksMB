class AreaTrabajo{
    constructor(idAreaTrabajo,nombre){
        this._idAreaTrabajo = idAreaTrabajo;
        this._nombre = nombre;
    }

    get idAreaTrabajo(){
        return this._idAreaTrabajo;
    }

    set idAreaTrabajo(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del area de trabjo debe ser un numero positivo');
        }
    }

    get nombre(){
        return this._nombre;
    }   

    set nombre(value){
        if(typeof value === 'string' && value.trim() !== ''){
            this._nombre = value;
        }else{
            throw new Error('El nombre debe ser un string no vacio');
        }
    }
}

module.exports = AreaTrabajo;