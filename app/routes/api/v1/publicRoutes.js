module.exports = {
	'GET /status': 'APIController.getStatus',

	// User:
	'POST /auth/register': 'UsersController.register',
	'POST /auth/login': 'UsersController.login',
	'POST /auth/validate': 'UsersController.validate',
	'POST /auth/refresh': 'UsersController.refresh',
	'POST /auth/logout': 'UsersController.logout',

	//Report
	'GET /reports': 'ReportsController.getAll',
	'GET /reports/:id': 'ReportsController.getById',
	'POST /reports/:userId': 'ReportsController.create',

	//Article
	'GET /articles': 'ArticlesController.getAll',
	'GET /articles/:id': 'ArticlesController.getById',
	'POST /articles/:userId': 'ArticlesController.create',
};
