import { Module } from '@nestjs/common';
import { HomeworkService } from './services/homework/homework.service';
import { ClassroomService } from './services/classroom/classroom.service';
import { HomeworkController } from './controllers/homework/homework.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [HomeworkService, ClassroomService],
  controllers: [HomeworkController],
})
export class VirtualClassroomModule {}
