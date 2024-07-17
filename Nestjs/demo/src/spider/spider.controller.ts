import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpiderService } from './spider.service';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}

  @Post()
  create(@Body() createSpiderDto: CreateSpiderDto) {
    return this.spiderService.create(createSpiderDto);
  }

  @Get()
  async findAll() {
    // return this.spiderService.findAll();

    const baseUrl = 'https://www.4kbizhi.com';
    const urls: string[] = [];
    const homeUrl = '/meinv';
    let index = 0;
    let pageTotal = 2;
    async function getImages(path = homeUrl) {
      // const body = await axios.get(baseUrl + path).then((res) => res.data);
      const body = await axios.get(baseUrl + '/meinv/index_4.html').then((res) => res.data);
      const $ = cheerio.load(body);
      $('.col .item a img').each(function (index, item) {
        urls.push(baseUrl + $(this).attr('src'));
      });
      const hrefs = $('.pages a[href*=".html"]:not(.next)')
        .slice(0, pageTotal)
        .map(function () {
          return $(this).attr('href');
        })
        .toArray();
      // if (index < hrefs.length) {
      //   const nextPath = hrefs[index];
      //   index += 1;
      //   await getImages(nextPath);
      // }
    }

    await getImages();

    const dirPath = path.join(__dirname, '../static/slider');

    // 清空文件夹
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true });
    }
    // 创建文件夹
    fs.mkdirSync(dirPath, { recursive: true });

    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url, {
          responseType: 'arraybuffer',
        })
        .then((res) => res.data);
      const ws = fs.createWriteStream(
        path.join(dirPath, `meinv-${new Date().getTime()}.jpg`),
      );
      ws.write(buffer);
    });

    return 'cors';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spiderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpiderDto: UpdateSpiderDto) {
    return this.spiderService.update(+id, updateSpiderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spiderService.remove(+id);
  }
}
