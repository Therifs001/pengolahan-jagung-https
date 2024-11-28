server.route({
  method: 'GET',
  path: '/notes',  // Rute yang benar
  handler: (request, h) => {
    const { active } = request.query;
    if (active !== '1' && active !== '0') {
      return h.response({
        error: true,
        message: "Parameter 'active' harus 1 (buah) atau 0 (kulit)"
      }).code(400);
    }
    const filteredNotes = notes.filter(note =>
      (active === '1' && note.category === 'Corn') ||
      (active === '0' && note.category === 'Husk')
    );
    return {
      error: false,
      message: 'Recommendations fetched successfully',
      listNotes: filteredNotes
    };
  }
});

server.route({
  method: 'GET',
  path: '/notes/{id}',  // Rute yang benar
  handler: (request, h) => {
    const { id } = request.params;
    const recommendation = notes.find(note => note.id == id);
    if (!recommendation) {
      return h.response({
        error: true,
        message: 'Recommendation not found'
      }).code(404);
    }
    return {
      error: false,
      message: 'Recommendation fetched successfully',
      recommendation: recommendation
    };
  }
});

