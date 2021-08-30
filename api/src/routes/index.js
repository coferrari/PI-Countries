const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRoutes = require('./countries');
const activityRoutes = require('./activity');
const countryRoutes = require('./country');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countriesRoutes);
router.use('/activity', activityRoutes);
router.use('/country', countryRoutes);

module.exports = router;
