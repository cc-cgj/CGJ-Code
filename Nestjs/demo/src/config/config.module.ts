import { Module, Global, DynamicModule } from '@nestjs/common';

interface Options {
  path: string;
}

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      // providers和 exports要一致
      providers: [
        {
          provide: 'Config',
          useValue: {
            baseUrl: '/api' + options.path,
          },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: {
            baseUrl: '/api' + options.path,
          },
        },
      ],
    };
  }
}
