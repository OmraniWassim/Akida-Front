import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDiscountComponent } from './gestion-discount.component';

describe('GestionDiscountComponent', () => {
  let component: GestionDiscountComponent;
  let fixture: ComponentFixture<GestionDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDiscountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
