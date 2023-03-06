import { Test, TestingModule } from '@nestjs/testing';
import { NewcontrollerController } from './newcontroller.controller';

describe('NewcontrollerController', () => {
  let controller: NewcontrollerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewcontrollerController],
    }).compile();

    controller = module.get<NewcontrollerController>(NewcontrollerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
