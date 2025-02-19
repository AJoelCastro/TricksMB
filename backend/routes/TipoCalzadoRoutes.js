const expres = express();
const tipoCalzadoController = require('../controllers/TipoCalzadoController')
const authMiddleware = require('../middlewares/authMiddleware');

expres.get('/todos',authMiddleware,tipoCalzadoController.getAllTipoCalzado)

module.exports = expres;