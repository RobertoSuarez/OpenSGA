import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { launch } from 'puppeteer';

@Injectable()
export class HomeworkService {
  constructor(private _configService: ConfigService) {}

  async getHomework() {
    const browser = await launch({
      headless: true,
      args: ['--start-maximized'],
    });
    const page = await browser.newPage();

    await page.goto('https://sga.uteq.edu.ec/loginsga', {
      waitUntil: 'domcontentloaded',
    });

    const username = this._configService.get<string>('SGA_USERNAME');
    const password = this._configService.get<string>('SGA_PASSWORD');

    await page.evaluate(
      (username, password) => {
        document.querySelector<HTMLInputElement>('#userdeclaracion').value =
          username;
        document.querySelector<HTMLInputElement>('#passdeclaracion').value =
          password;
        document.querySelector<HTMLButtonElement>('#logindeclaracion').click();
        document.querySelector<HTMLInputElement>('#acepto').click();
        document.querySelector<HTMLButtonElement>('#logindeclaracion1').click();
      },
      username,
      password,
    );

    await page.waitForNavigation();

    await page.goto('https://sga.uteq.edu.ec/alu_documentos', {
      waitUntil: 'domcontentloaded',
    });

    const homeworks = await page.evaluate(() => {
      const homeworks: Homework[] = [];
      const tasks = document.querySelectorAll<HTMLDivElement>('.det-div-alert');
      tasks.forEach((task) => {
        const homework: Homework = {};
        homework.url = task.querySelector<HTMLAnchorElement>('.destino').href;
        homework.title =
          task.querySelector<HTMLAnchorElement>('.destino').innerText;
        homework.classroom = task.querySelector('.text-warning').textContent;
        homework.from = task.children[3].textContent;
        homework.to = task.children[5].textContent;
        homeworks.push(homework);
        console.log(task.children);
      });

      return homeworks;
    });

    await browser.close();

    return homeworks;
  }
}

export interface Homework {
  id?: string;
  url?: string;
  title?: string;
  classroom?: string;
  from?: string; // desde.
  to?: string; // hasta.
}
