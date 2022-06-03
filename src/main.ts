import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

const ONE_WEEK_SECONDS = 604800;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    url: 'redis://localhost:6379',
    legacyMode: true,
  });

  redisClient.connect().catch(console.error);

  const redisStopreOptions: any = {
    client: redisClient,
    ttl: ONE_WEEK_SECONDS,
  };

  app.use(
    session({
      store: new RedisStore(redisStopreOptions),
      secret: configService.get('SECRET_KEY'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
