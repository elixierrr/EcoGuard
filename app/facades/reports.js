const Report = require('#models/Report');

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport
};

async function createReport(data) {
  return Report.create(data);
}

async function getReports() {
  return Report.findAll();
}

async function getReportById(id) {
  return Report.findByPk(id);
}

async function updateReport(id, data) {
  const report = await Report.findByPk(id);
  if (!report) throw new Error('Report not found');
  return report.update(data);
}

async function deleteReport(id) {
  const report = await Report.findByPk(id);
  if (!report) throw new Error('Report not found');
  return report.destroy();
}