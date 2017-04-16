import { TestBed, inject } from '@angular/core/testing';

import { DbService } from './db.service';

describe('DbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbService]
    });
  });

  it('should ...', inject([DbService], (service: DbService) => {
    const testModel = {
        backgroundUrl: "sdsd"
    };  

    const badTestModel = {
        backgroundUrl: "sdsd11"
    };  
    service.setCardModel(testModel);
    let carmodel = null;
    service.getCardModel()
    .take(1)
    .subscribe(item => carmodel = item);  
    expect(carmodel.backgroundUrl).toContain(testModel.backgroundUrl);
  }));
});
