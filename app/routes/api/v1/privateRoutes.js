module.exports = {
	//Report
	'GET /reports': 'ReportsController.getAll',
	'GET /reports/:id': 'ReportsController.getById',
	'POST /reports/:userId': 'ReportsController.create',
	'GET /reports/user/:userId': 'ReportsController.getbyUserId',

	//Article
	'GET /articles': 'ArticlesController.getAll',
	'GET /articles/:id': 'ArticlesController.getById',
	'POST /articles/:userId': 'ArticlesController.create',
};
