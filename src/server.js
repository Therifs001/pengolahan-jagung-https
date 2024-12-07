const Hapi = require('@hapi/hapi');
const fs = require('fs');
const path = require('path');
const recoms = require('./recoms'); 
const Inert = require('@hapi/inert');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0', 
  });

  await server.register(Inert);

  // Rute untuk melayani gambar
  server.route({
    method: 'GET',
    path: '/images/{filename}',
    handler: (request, h) => {
      const imagesPath = path.resolve(__dirname, 'images', request.params.filename); // Perbaikan path
      return h.file(imagesPath);
    },
  });

  // Rute untuk root URL
  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({
      message: 'Selamat datang di Pengolahan Jagung! Gunakan /recoms untuk melihat rekomendasi.',
    }),
  });

  // Rute untuk mendapatkan daftar rekomendasi
  server.route({
    method: 'GET',
    path: '/recoms',
    handler: (request, h) => {
      const { active } = request.query;

      if (!active) { // Tampilkan semua rekomendasi jika parameter tidak diberikan
        return {
          error: false,
          message: 'Recommendations fetched successfully',
          listRecoms: recoms,
        };
      }

      if (active !== '1' && active !== '0') {
        return h.response({
          error: true,
          message: "Parameter 'active' harus 1 (buah) atau 0 (kulit)",
        }).code(400);
      }

      const filteredRecoms = recoms.filter(
        (recom) => (active === '1' && recom.category === 'Corn') || (active === '0' && recom.category === 'Husk')
      );

      return {
        error: false,
        message: 'Recommendations fetched successfully',
        listRecoms: filteredRecoms,
      };
    },
  });

  // Rute untuk mendapatkan detail rekomendasi berdasarkan ID
  server.route({
    method: 'GET',
    path: '/recoms/{id}',
    handler: (request, h) => {
      const { id } = request.params;

      if (isNaN(id)) { // Validasi jika ID bukan angka
        return h.response({
          error: true,
          message: 'Invalid ID. ID must be a number.',
        }).code(400);
      }

      const recommendation = recoms.find((recom) => recom.id === parseInt(id, 10)); // Konversi ke integer

      if (!recommendation) {
        return h.response({
          error: true,
          message: 'Recommendation not found',
        }).code(404);
      }

      return {
        error: false,
        message: 'Recommendation fetched successfully',
        recommendation: recommendation,
      };
    },
  });

  await server.start();
  console.log('Server berjalan pada %s', server.info.uri);
};

init();
