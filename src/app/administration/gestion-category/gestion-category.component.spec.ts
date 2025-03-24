import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCategoryComponent } from './gestion-category.component';

describe('GestionCategoryComponent', () => {
  let component: GestionCategoryComponent;
  let fixture: ComponentFixture<GestionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
