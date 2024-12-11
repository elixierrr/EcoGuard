const reportsFacade = require('#facades/reports');
const upload = require('#utils/fileUpload'); // Middleware file upload
const { createOKResponse, createErrorResponse } = require('#factories/responses/api');

module.exports = ReportsController;

function ReportsController() {
  const _create = async (req, res) => {
    try {
      const { title, category, date, location, reportContent } = req.body;
      const image = req.file?.filename; // Filename dari file upload
      const { userId } = req.params; 

      const report = await reportsFacade.createReport({
        title,
        category,
        date,
        location,
        reportContent,
        image,
        createdBy:userId
      });
      return createOKResponse({ res, content: report });
    } catch (error) {
      console.error('ReportsController._create error:', error);
      return createErrorResponse({ res, error: { message: error.message }, status: 400 });
    }
  };

  const _getAll = async (req, res) => {
    try {
      const reports = await reportsFacade.getReports();
      return createOKResponse({ res, content: reports });
    } catch (error) {
      console.error('ReportsController._getAll error:', error);
      return createErrorResponse({ res, error: { message: error.message }, status: 400 });
    }
  };

  const _getById = async (req, res) => {
    try {
      const { id } = req.params;
      const report = await reportsFacade.getReportById(id);
      if (!report) throw new Error('Report not found');
      return createOKResponse({ res, content: report });
    } catch (error) {
      console.error('ReportsController._getById error:', error);
      return createErrorResponse({ res, error: { message: error.message }, status: 404 });
    }
  };

  const _update = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      if (req.file) data.image = req.file.filename; // Handle file upload

      const updatedReport = await reportsFacade.updateReport(id, data);
      return createOKResponse({ res, content: updatedReport });
    } catch (error) {
      console.error('ReportsController._update error:', error);
      return createErrorResponse({ res, error: { message: error.message }, status: 400 });
    }
  };

  const _delete = async (req, res) => {
    try {
      const { id } = req.params;
      await reportsFacade.deleteReport(id);
      return createOKResponse({ res, content: { message: 'Report deleted successfully' } });
    } catch (error) {
      console.error('ReportsController._delete error:', error);
      return createErrorResponse({ res, error: { message: error.message }, status: 400 });
    }
  };

  return {
    create: [upload.single('image'), _create], 
    getAll: _getAll,
    getById: _getById,
    update: [upload.single('image'), _update], 
    delete: _delete
  };
}