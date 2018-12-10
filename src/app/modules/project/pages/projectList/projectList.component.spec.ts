import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './projectList.component';
import { Project } from '../../../../model/project/project';
import { FakerDecorator } from '../../../../services/utils/faker-decorator';

describe('ProjectComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let faker = FakerDecorator.getFaker();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;

    if (component.projects.length === 0) {
      new Array(10).fill(null).forEach((item, i) => {
        component.projects.push(new Project(faker.commerce.productName(), faker.lorem.sentence()));
      });
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    let compiled = fixture.debugElement.nativeElement;
    const cards = compiled.querySelectorAll('.project-card') || [];

    expect(cards.length === component.projects.length).toBeTruthy();
  });
});
