// server.js
const Hapi = require('@hapi/hapi');
const notes = require('./notes'); // Mengimpor data rekomendasi
const Inert = require('@hapi/inert');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  });

  await server.register(Inert);

  const path = require('path');

  // Rute untuk melayani gambar
  server.route({
    method: 'GET',
    path: '/images/{filename}',
    handler: (request, h) => {
      // Menggunakan path absolut untuk memastikan akses yang benar
      const imagesPath = path.join(__dirname, '../images', request.params.filename);
      return h.file(imagesPath);
    }
  });

  // Rute untuk root URL
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        message: 'Selamat datang di Pengolahan Jagung! Gunakan /recommendations untuk melihat rekomendasi.'
      };
    }
  });

  // Rute untuk mendapatkan daftar rekomendasi
  server.route({
    method: 'GET',
    path: '/notes',
    handler: (request, h) => {
      const { active } = request.query;

      // Validasi parameter active
      if (active !== '1' && active !== '0') {
        return h.response({
          error: true,
          message: "Parameter 'active' harus 1 (buah) atau 0 (kulit)"
        }).code(400);
      }

      // Menyaring data berdasarkan kategori
      const filteredNotes = notes.filter(note => 
        (active == 1 && note.category === 'Corn') || (active == 0 && note.category === 'Husk')
      );

      return {
        error: false,
        message: 'Recommendations fetched successfully',
        listNotes: filteredNotes
      };
    }
  });

  // Rute untuk mendapatkan detail rekomendasi berdasarkan ID
  server.route({
    method: 'GET',
    path: '/notes/{id}',
    handler: (request, h) => {
      const { id } = request.params;
      const recommendation = notes.find(note => note.id === parseInt(id));

      if (!recommendation) {
        return h.response({
          error: true,
          message: 'Recommendation not found'
        }).code(404);
      }

      return {
        error: false,
        message: 'Recommendation fetched successfully',
        recommendation: [recommendation]
      };
    }
  });

  await server.start();
  console.log('Server berjalan pada %s', server.info.uri);
};

init();
