import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScllibComponent } from './scllib.component';

describe('ScllibComponent', () => {
  let component: ScllibComponent;
  let fixture: ComponentFixture<ScllibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScllibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScllibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
