import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProcessOrderComponent } from './dialog-process-order.component';

describe('DialogProcessOrderComponent', () => {
  let component: DialogProcessOrderComponent;
  let fixture: ComponentFixture<DialogProcessOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProcessOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProcessOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
