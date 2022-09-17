import { Module } from '@nestjs/common';
import { DummyModule } from './dummy/dummy.module';

@Module({
  imports: [DummyModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
