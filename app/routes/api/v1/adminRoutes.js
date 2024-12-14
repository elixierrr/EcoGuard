module.exports = {
	'PUT /reports/:id': 'ReportsController.update',
	'DELETE /reports/:id': 'ReportsController.delete',
	'GET /reports': 'ReportsController.getAll',

	'POST /articles/:userId': 'ArticlesController.create',
	'PUT /articles/:id': 'ArticlesController.update',
	'DELETE /articles/:id': 'ArticlesController.delete',
};
