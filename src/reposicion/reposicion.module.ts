import { Module } from '@nestjs/common';
import { ReposicionService } from './reposicion.service.js';
import { ReposicionController } from './reposicion.controller.js';

@Module({
  controllers: [ReposicionController],
  providers: [ReposicionService],
  exports: [ReposicionService],
})
export class ReposicionModule {}
