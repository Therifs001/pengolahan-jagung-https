const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000, 
    host: '0.0.0.0',
  });

  // Mendaftarkan plugin Inert
  await server.register(Inert);

  // Menambahkan rute
  server.route(routes);

  // Menangani kesalahan saat memulai server
  try {
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (err) {
    console.error('Gagal memulai server:', err);
    process.exit(1); // Keluar dari proses jika gagal
  }
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

init();
