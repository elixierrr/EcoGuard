module.exports = {
	'GET /users/name': 'UsersController.getFullName',

	'PUT /reports/:id': 'ReportsController.update',
	'DELETE /reports/:id': 'ReportsController.delete',

	'PUT /articles/:id': 'ArticlesController.update',
	'DELETE /articles/:id': 'ArticlesController.delete',
};
