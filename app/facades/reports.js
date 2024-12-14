const Report = require('#models/Report');

module.exports = {
  createReport,
  getReports,
  getReportById,
  getReportsByUserId,
  updateReport,
  deleteReport,
  getReportStatistics
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

async function getReportsByUserId(userId) {
  return Report.findAll({ where: { createdBy: userId } });
}

async function updateReport(id, data) {
  const report = await Report.findByPk(id);
  if (!report) throw new Error('Report not found');
  
  // Cek apakah status yang dikirim valid
  if (data.status && !['Pending', 'In Progress', 'Completed'].includes(data.status)) {
    throw new Error('Invalid status value');
  }

  // Proses update
  return report.update(data);
}

async function deleteReport(id) {
  const report = await Report.findByPk(id);
  if (!report) throw new Error('Report not found');
  return report.destroy();
}

async function getReportStatistics() {
  const statusCount = await Report.count({
    group: ['status'],
  });

  const categoryCount = await Report.count({
    group: ['category'],
  });

  const severityCount = await Report.count({
    group: ['severity'],
  });

  // Proses key untuk kategori agar tidak ada spasi
  const processedCategoryCount = categoryCount.reduce((acc, item) => {
    const key = item.category?.replace(/\s+/g, '_'); // Ganti spasi dengan _
    acc[key] = item.count;
    return acc;
  }, {});

  // Proses key untuk status dan severity jika diperlukan
  const processedStatusCount = statusCount.reduce((acc, item) => {
    acc[item.status] = item.count;
    return acc;
  }, {});

  const processedSeverityCount = severityCount.reduce((acc, item) => {
    acc[item.severity] = item.count;
    return acc;
  }, {});

  return {
    status: processedStatusCount,
    category: processedCategoryCount,
    severity: processedSeverityCount,
  };
}
