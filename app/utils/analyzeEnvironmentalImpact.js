const tf = require('@tensorflow/tfjs');
const environmentalAnalysisModel = require('#ai/model.json');

async function _analyzeEnvironmentalImpact(data) {
    const model = await tf.loadLayersModel(environmentalAnalysisModel);
    const input = tf.tensor2d([data.reportContent]);
    const output = model.predict(input);
    const result = await output.data();
    return result;
}

module.exports = {
    analyzeEnvironmentalImpact: _analyzeEnvironmentalImpact
}