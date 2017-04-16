
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { CardItemComponent } from './card-item.component';
import { TextModel } from '../model';


describe('CardItemComponent', () => {
      let component: CardItemComponent;
      let fixture: ComponentFixture<CardItemComponent>;
      let cardBody: any;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ CardItemComponent ]
        })
        .compileComponents();
      }));



      beforeEach(() => {
        fixture = TestBed.createComponent(CardItemComponent);
        component = fixture.componentInstance;
        cardBody  = fixture.debugElement.query(By.css('.card-item__body'));

        let item  = new TextModel();
        item.text = 'Test text';
        item.color = 'rgb(255, 255, 255)';
        item.x = 100;
        item.y = 100;
        item.font = 'Aria';
        component.item = item;

        fixture.detectChanges();
      });

    it('Проверка присвоения переменных дому: text', () => {
        expect(cardBody.nativeElement.textContent).toContain("Test text");
    });
    it('Проверка присвоения переменных дому: color', () => {
        expect(cardBody.nativeElement.style.color).toContain('rgb(255, 255, 255)');
    });
  
});
