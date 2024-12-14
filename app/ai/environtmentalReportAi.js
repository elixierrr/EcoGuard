const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

class EnvironmentalReportAI {
  constructor() {
    this.model = null;
    this.labelMappings = null;
    this.inputFeatures = ['reportContent', 'category'];
  }

  async initialize() {
    try {
      // Load label mappings
      const labelPath = path.join(__dirname, 'label_mapping.json');
      this.labelMappings = JSON.parse(fs.readFileSync(labelPath, 'utf-8'));

      // Load model architecture
      const modelPath = path.join(__dirname, 'model_architecture.json');
      const modelConfig = JSON.parse(fs.readFileSync(modelPath, 'utf-8'));

      // Recreate model based on saved architecture
      this.model = await this.createModel(modelConfig);
      
    
    } catch (error) {
      console.error('AI Model Initialization Error:', error);
      throw error;
    }
  }

  createModel(modelConfig) {
    const model = tf.sequential();

    // Add layers based on the configuration
    modelConfig.config.layers.forEach(layerConfig => {
      let layer;
      switch(layerConfig.class_name) {
        case 'InputLayer':
          layer = tf.layers.inputLayer({
            inputShape: [2],  // Fixed 2 input features
            name: layerConfig.config.name
          });
          break;
        case 'Dense':
          layer = tf.layers.dense({
            units: layerConfig.config.units,
            activation: layerConfig.config.activation,
            name: layerConfig.config.name
          });
          break;
      }
      model.add(layer);
    });

    // Compile model
    model.compile({
      optimizer: 'adam',
      loss: 'sparseCategoricalCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  preprocessInput(reportContent, category) {
    // Convert text and category to numerical features
    const contentLength = reportContent.length;
    const categoryEncoding = this.encodeCategoryToNumeric(category);

    // Normalize features
    const features = [
      contentLength / 1000,  // Normalize content length
      categoryEncoding
    ];

    return tf.tensor2d([features]);
  }

  encodeCategoryToNumeric(category) {
    const categories = [
      'Water Pollution', 
      'Air Pollution', 
      'Waste Management', 
      'Environmental Damage',
      'Others'
    ];
    return categories.indexOf(category) / (categories.length - 1);
  }

  async predictEnvironmentalImpact(reportContent, category) {
    if (!this.model) {
      await this.initialize();
    }

    const inputTensor = this.preprocessInput(reportContent, category);
    const prediction = this.model.predict(inputTensor);
    const predictedClassIndex = prediction.argMax(-1).dataSync()[0];

    // Map prediction to meaningful labels
    const impactLabels = [
      'Low Impact', 
      'Medium Impact', 
      'High Impact', 
      'Critical Impact',
      'Severe Pollution',
      'Moderate Pollution',
      'Minor Pollution',
      'Emergency',
      'Long-term Damage',
      'Immediate Action Required',
      'Ecosystem Threat',
      'Community Health Risk'
    ];

    return {
      predictedImpact: impactLabels[predictedClassIndex],
      confidenceScore: prediction.max(-1).dataSync()[0]
    };
  }

  async analyzeReport(report) {
    try {
      const { title, reportContent, category } = report;

      // Perform AI-powered analysis
      const environmentalAnalysis = await this.predictEnvironmentalImpact(
        reportContent, 
        category
      );

      // Additional text-based severity assessment
      const severityKeywords = {
        highRisk: ['toxic', 'dangerous', 'critical', 'emergency', 'severe'],
        mediumRisk: ['concerning', 'significant', 'notable', 'moderate'],
        lowRisk: ['minor', 'slight', 'minimal']
      };

      const contentLower = reportContent.toLowerCase();
      let textBasedSeverity = 'Low Risk';
      
      if (severityKeywords.highRisk.some(keyword => contentLower.includes(keyword))) {
        textBasedSeverity = 'High Risk';
      } else if (severityKeywords.mediumRisk.some(keyword => contentLower.includes(keyword))) {
        textBasedSeverity = 'Medium Risk';
      }

      return {
        aiPrediction: environmentalAnalysis,
        textBasedSeverity,
        recommendations: this.generateRecommendations(
          environmentalAnalysis.predictedImpact, 
          textBasedSeverity
        )
      };
    } catch (error) {
      console.error('Report Analysis Error:', error);
      return null;
    }
  }

  generateRecommendations(aiImpact, textSeverity) {
    // Generate actionable recommendations based on impact assessment
    const recommendationMap = {
      'High Impact': [
        'Immediate environmental intervention required',
        'Engage local environmental authorities',
        'Conduct comprehensive site assessment'
      ],
      'Critical Impact': [
        'Urgent remediation needed',
        'Consider environmental emergency protocols',
        'Notify relevant government agencies'
      ],
      'Medium Risk': [
        'Develop mitigation strategy',
        'Monitor environmental changes',
        'Implement preventive measures'
      ],
      'High Risk': [
        'Rapid response team deployment',
        'Comprehensive environmental impact study',
        'Community safety assessment'
      ]
    };

    return recommendationMap[aiImpact] || recommendationMap['Medium Risk'];
  }
}

module.exports = new EnvironmentalReportAI();