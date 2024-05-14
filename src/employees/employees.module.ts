import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([{
      name: "short",
      ttl: 1000,
      limit: 2
    },{
      name: "long",
      ttl: 60000,
      limit: 5      
    }])
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class EmployeesModule {}
