import { Module } from '@nestjs/common';
import { CommonModule } from './common.module';

@Module({
  imports: [CommonModule], // 导入 模块
  exports: [CommonModule], // 导出 模块
})
export class CoreModule {}
