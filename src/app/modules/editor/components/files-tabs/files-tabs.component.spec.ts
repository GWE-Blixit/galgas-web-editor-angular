import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTabsComponent } from './files-tabs.component';

describe('FilesTabsComponent', () => {
  let component: FilesTabsComponent;
  let fixture: ComponentFixture<FilesTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
