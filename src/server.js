const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: '0.0.0.0',
  });

  await server.register(Inert);

  // Daftar rute
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
