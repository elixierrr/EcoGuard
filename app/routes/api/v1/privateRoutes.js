module.exports = {
	//Report
	
	'GET /reports/:id': 'ReportsController.getById',
	'POST /reports/:userId': 'ReportsController.create',
	'GET /reports/user/:userId': 'ReportsController.getbyUserId',

	//Article
	'GET /articles': 'ArticlesController.getAll',
	'GET /articles/:id': 'ArticlesController.getById',

	//Statistic
	'GET /statistics': 'ReportsController.getStatistics'
};
