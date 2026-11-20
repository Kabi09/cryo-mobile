import app from './app.js';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

let server;

async function bootstrap() {
  try {
    await connectDB();

    server = app.listen(env.port, () => {
      console.log(`[Cryo ERP Server] Listening on port ${env.port} (${env.nodeEnv})`);
      console.log(`[Cryo ERP Server] Health Check: http://localhost:${env.port}/api/v1/health`);
    });

    const shutdown = async (signal) => {
      console.log(`\n[Cryo ERP Server] Received ${signal}. Gracefully shutting down...`);
      if (server) {
        server.close(async () => {
          console.log('[Cryo ERP Server] HTTP server closed');
          await disconnectDB();
          process.exit(0);
        });
      } else {
        await disconnectDB();
        process.exit(0);
      }
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('[Cryo ERP Server] Bootstrap error:', error);
    process.exit(1);
  }
}

bootstrap();
