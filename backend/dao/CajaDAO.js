const db = require('../config/db');
// const CodQR = require('qrcode');

class CajaDAO{

    static async createCaja(idCaracteristica){
        try{
            const query = await db.query(`ISERT INTO Caja (Caracteristicas_idCaracteristicas, CodigoQR) VALUES (?, ?)`);
            const [result] = await db.execute(query, [idCaracteristica, "tempQR"]);

            const idCaja = result.insertId;

            const qrCodData = `http://tricks.com/caja/${idCaja}`;

            await db.query(`UPDATE Caja SET CodigoQR = ? WHERE idCaja = ?`, [qrCodData, idCaja]);

            return { idCaja, idCaracteristica, qrCodData };
        }catch(error){
            console.error(error);
            throw error;
        }
    } 

    static async getAllCajaByPedido(idCaracteristica){
        try{
            const query = `
                SELECT * 
                FROM Caja
                WHERE Caracteristicas_idCaracteristicas = ?
            `;
            const [rows] = await db.execute(query, [idCaracteristica]);
            return rows;
        }catch(error){
            console.error(error);
            throw error;
        }


    }

}

module.exports = CajaDAO;