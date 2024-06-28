import { Controller, Get } from '@nestjs/common';
import { HomeworkService } from 'src/virtual-classroom/services/homework/homework.service';

@Controller('homework')
export class HomeworkController {
  constructor(private _homeworkService: HomeworkService) {}

  @Get()
  async getHomework() {
    return await this._homeworkService.getHomework();
  }
}
