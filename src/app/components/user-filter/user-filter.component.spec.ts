import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersFilterComponent } from './user-filter.component';
import { filterData } from 'src/app/mocks/filter-data.mock';

describe('UsersComponent', () => {
  let component: UsersFilterComponent;
  let fixture: ComponentFixture<UsersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [UsersFilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the user component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit data based on data entered', () => {
    component.ngOnInit();

    const { filterField } = component.filterForm.controls;
    filterField.setValue('Bell');
    fixture.detectChanges();
    component.filterOptions.subscribe(next => {
      expect(next).toEqual(filterData);
    });
  });
});
