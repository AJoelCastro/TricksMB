class DetallePedido {
    constructor(idDetallePedido, pedidoId, productoId, color, talla, cantidad, nombreTaco, alturaTaco, material, tipoMaterial, suela, accesorios, forro) {
        this._idDetallePedido = idDetallePedido;
        this._pedidoId = pedidoId;
        this._productoId = productoId;
        this._color = color;
        this._talla = talla;
        this._cantidad = cantidad;
        this._nombreTaco = nombreTaco;
        this._alturaTaco = alturaTaco;
        this._material = material;
        this._tipoMaterial = tipoMaterial;
        this._suela = suela;
        this._accesorios = accesorios;
        this._forro = forro;
    }

    get idDetallePedido() {
        return this._idDetallePedido;
    }

    set idDetallePedido(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('El id del detalle del pedido debe ser un número positivo');
        }
        this._idDetallePedido = value;
    }

    get pedidoId() {
        return this._pedidoId;
    }

    set pedidoId(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('El id del pedido debe ser un número positivo');
        }
        this._pedidoId = value;
    }

    get productoId() {
        return this._productoId;
    }

    set productoId(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('El id del producto debe ser un número positivo');
        }
        this._productoId = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        if (typeof value === 'string' && value.trim() !== '') {
            this._color = value;
        } else {
            throw new Error('El color debe ser un string no vacío');
        }
    }

    get talla() {
        return this._talla;
    }

    set talla(value) {
        if (typeof value === 'string' && value.trim() !== '') {
            this._talla = value;
        } else {
            throw new Error('La talla debe ser un string no vacío');
        }
    }

    get cantidad() {
        return this._cantidad;
    }

    set cantidad(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('La cantidad debe ser un número positivo');
        }
        this._cantidad = value;
    }

    get nombreTaco() {
        return this._nombreTaco;
    }

    set nombreTaco(value) {
        if (typeof value === 'string' && value.trim() !== '') {
            this._nombreTaco = value;
        } else {
            throw new Error('El nombre del taco debe ser un string no vacío');
        }
    }

    get alturaTaco() {
        return this._alturaTaco;
    }

    set alturaTaco(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('La altura del taco debe ser un número positivo');
        }
        this._alturaTaco = value;
    }

    get material() {
        return this._material;
    }

    set material(value) {
        if (typeof value === 'string' && value.trim() !== '') {
            this._material = value;
        } else {
            throw new Error('El material debe ser un string no vacío');
        }
    }

    get tipoMaterial() {
        return this._tipoMaterial;
    }

    set tipoMaterial(value) {
        if (typeof value === 'string' && value.trim() !== '') {
            this._tipoMaterial = value;
        } else {
            throw new Error('El tipo de material debe ser un string no vacío');
        }
    }

    get suela() {
        return this._suela;
    }

    set suela(value) {
        if (typeof value === 'string' && value.trim() !== '') {
            this._suela = value;
        } else {
            throw new Error('La suela debe ser un string no vacío');
        }
    }

    get accesorios() {
        return this._accesorios;
    }

    set accesorios(value) {
        if (typeof value === 'string' && value.trim() !== '') {
            this._accesorios = value;
        } else {
            throw new Error('Los accesorios deben ser un string no vacío');
        }
    }

    get forro() {
        return this._forro;
    }

    set forro(value) {
        if (typeof value === 'string' && value.trim() !== '') {
            this._forro = value;
        } else {
            throw new Error('El forro debe ser un string no vacío');
        }
    }

}

module.exports = DetallePedido;