server.route({
  method: 'GET',
  path: '/recommendations',
  handler: (request, h) => {
      const { active } = request.query;

      if (active !== '1' && active !== '0') {
          return h.response({
              error: true,
              message: "Parameter 'active' harus 1 (buah) atau 0 (kulit)"
          }).code(400);
      }

      const filteredRecoms = recoms.filter(recom =>
          (active === '1' && recom.category === 'Corn') ||
          (active === '0' && recom.category === 'Husk')
      );

      return {
          error: false,
          message: 'Recommendations fetched successfully',
          listRecoms: filteredRecoms
      };
  }
});
server.route({
  method: 'GET',
  path: '/recommendations/{id}',
  handler: (request, h) => {
      const { id } = request.params;
      const recommendation = recoms.find(recom => recom.id === id);

      if (!recommendation) {
          return h.response({
              error: true,
              message: 'Recommendation not found'
          }).code(404);
      }

      return {
          error: false,
          message: 'Recommendation fetched successfully',
          recommendation
      };
  }
});




