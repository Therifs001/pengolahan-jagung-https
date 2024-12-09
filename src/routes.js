const recoms = require('./recoms');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => ({
      message: 'Welcome to Pengolahan Jagung!',
    }),
  },
  {
    method: 'GET',
    path: '/recommendations',
    handler: (request, h) => ({
      error: false,
      message: 'Recommendations fetched successfully',
      listRecoms: recoms,
    }),
  },
  {
    method: 'GET',
    path: '/recommendations/{id}',
    handler: (request, h) => {
      const { id } = request.params;
      const recommendation = recoms.find((recom) => recom.id === parseInt(id, 10));

      if (!recommendation) {
        return h.response({
          error: true,
          message: 'Recommendation not found',
        }).code(404);
      }

      
      const numberedSteps = recommendation.steps.map((step, index) => `${index + 1}. ${step}`);

      return {
        error: false,
        message: 'Recommendation fetched successfully',
        recommendation: {
          ...recommendation,
          steps: numberedSteps, 
        },
      };
    },
  },
];





