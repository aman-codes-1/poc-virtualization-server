import compress from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import Express from 'express';
import * as express from 'express';
import helmet from 'helmet';
import methodOverride from 'method-override';
import { ApolloServer } from 'apollo-server-express';
import { UserListAPI } from './datasource';

export default class Server {
  constructor(config) {
    this.config = config;
    this.app = new Express();
    this.run = this.run.bind(this);
  }

  get application() {
    return this.app;
  }

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   */
  bootstrap() {
    this.initHelmet();
    this.initCompress();
    this.initCors();
    this.initJsonParser();
    this.initMethodOverride();
    return this;
  }

  /**
   *
   * @returns -Instance of Current Object
   */
  run() {
    const { port, env } = this.config;
    this.httpServer.listen(port, () => {
      console.info(`server started on port ${port} (${env})`); // eslint-disable-line no-console
    });

    return this;
  }

  async setupApollo(schema) {
    const { app } = this;

    this.server = new ApolloServer({
      ...schema,
      dataSources: () => ({
        userListAPI: new UserListAPI(),
      }),
      onHealthCheck: () => new Promise((resolve) => {
        resolve('I am OK');
      }),
    });

    this.server.applyMiddleware({ app });
    this.httpServer = createServer(app);
    this.run();
  }

  /**
   * Compression of the output
   */
  initCompress() {
    this.app.use(compress());
  }

  /**
   *
   * Lets you to enable cors
   */
  initCors() {
    this.app.use(cors());
  }

  /**
   *
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   */
  initHelmet() {
    this.app.use(helmet());
  }

  /**
   *  - Parses urlencoded bodies & JSON
   */
  initJsonParser() {
    this.app.use([express.urlencoded({ extended: false }), express.json()]);
  }

  /**
   *
   * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
   */
  initMethodOverride() {
    this.app.use(methodOverride());
  }
}
