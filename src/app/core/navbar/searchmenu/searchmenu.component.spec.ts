import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmenuComponent } from './searchmenu.component';

describe('SearchmenuComponent', () => {
  let component: SearchmenuComponent;
  let fixture: ComponentFixture<SearchmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
