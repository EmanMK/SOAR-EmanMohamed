const http = require('http');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../../swaggerConfig');
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: 100,
	message: 'Too many requests from this IP, please try again after a minute',
	headers: true,
});

module.exports = class UserServer {
	constructor({ config, managers }) {
		this.config = config;
		this.userApi = managers.userApi;
	}

	/** for injecting middlewares */
	use(args) {
		app.use(args);
	}

	/** server configs */
	run() {
		app.use(cors({ origin: '*' }));
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use('/static', express.static('public'));
		app.use(limiter);

		/** an error handler */
		app.use((err, req, res, next) => {
			console.error(err.stack);
			res.status(500).send('Something broke!');
		});

		/** a single middleware to handle all */
		app.all('/api/:moduleName/:fnName', this.userApi.mw);

		app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

		let server = http.createServer(app);
		server.listen(this.config.dotEnv.USER_PORT, () => {
			console.log(
				`${this.config.dotEnv.SERVICE_NAME.toUpperCase()} is running on port: ${this.config.dotEnv.USER_PORT}`
			);
		});
	}
};
