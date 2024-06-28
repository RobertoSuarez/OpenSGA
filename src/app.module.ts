import { Module } from '@nestjs/common';
import { VirtualClassroomModule } from './virtual-classroom/virtual-classroom.module';
import { ConfigModule } from '@nestjs/config';
import Configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [Configuration],
    }),
    VirtualClassroomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
