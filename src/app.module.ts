import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestowyModule } from './testowy/testowy.module';
import { NewcontrollerController } from './newcontroller/newcontroller.controller';

@Module({
    imports: [
        // TypeOrmModule.forRoot(),
    TestowyModule],
    controllers: [AppController, NewcontrollerController],
    providers: [AppService],
})
export class AppModule {
}
