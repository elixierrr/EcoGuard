const reportsFacade = require('#facades/reports');
const upload = require('#utils/fileUpload'); // Middleware file upload
const { createOKResponse, createErrorResponse } = require('#factories/responses/api');
const environmentalReportAI = require('#ai/environtmentalReportAi');

module.exports = ReportsController;

function ReportsController() {
  const _create = async (req, res) => {
    try {
      const { title, category, date, location, reportContent, severity } = req.body;
      const image = req.file?.filename; 
      const { userId } = req.params;
      const reportData = { title, category, date, location, reportContent, severity }
      const aiAnalysis = await environmentalReportAI.analyzeReport(reportData);

      const report = await reportsFacade.createReport({
        title,
        category,
        date,
        location,
        reportContent,
        image,
        severity,
        createdBy: userId
      });
      return createOKResponse({ res, content: {report, aiAnalysis} });
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

  const _getByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const reports = await reportsFacade.getReportsByUserId(userId);
      return createOKResponse({ res, content: reports });
    } catch (error) {
      console.error('ReportsController._getByUserId error:', error);
      return createErrorResponse({ res, error: { message: error.message }, status: 400 });
    }
  };

  const _update = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
  
      // Pastikan status yang dikirim valid
      if (data.status && !['Pending', 'In Progress', 'Completed'].includes(data.status)) {
        return createErrorResponse({
          res,
          error: { message: 'Invalid status value' },
          status: 400,
        });
      }
  
      // Jika ada file (image) yang diupload, tambahkan image ke dalam data
      if (req.file) data.image = req.file.filename;
  
      // Proses update laporan
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

  const _getStatistics = async (req, res) => {
    try {
      const statistics = await reportsFacade.getReportStatistics();
      return createOKResponse({ res, content: statistics });
    } catch (error) {
      console.error('ReportsController._getStatistics error:', error);
      return createErrorResponse({ res, error: { message: error.message }, status: 500 });
    }
  };

  return {
    create: [upload.single('image'), _create], 
    getAll: _getAll,
    getById: _getById,
    getbyUserId: _getByUserId,
    update: [upload.single('image'), _update], 
    delete: _delete,
    getStatistics: _getStatistics
  };
}