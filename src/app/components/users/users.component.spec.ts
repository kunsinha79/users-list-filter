import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UsersService } from '../../users.service';
import { of } from 'rxjs';
import { UsersComponent } from './users.component';
import { Users } from '../../interfaces/user.interface';
import { userMock } from '../../mocks/user.mock';
import { filterData, filterNoData } from 'src/app/mocks/filter-data.mock';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let service: UsersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [UsersComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [UsersService, HttpClient]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UsersService);
    spyOn(service, 'getUsers').and.returnValue(of(userMock));
    fixture.detectChanges();
  });

  it('should create the user component', () => {
    expect(component).toBeTruthy();
  });

  it('should get users on init', () => {
    component.ngOnInit();
    expect(service.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(userMock);
  });

  it('should display one table based on response', () => {
    const element: HTMLElement = fixture.nativeElement;
    const table = element.querySelectorAll('table');
    expect(table[0].rows.length).toBe(3);
  });

  it('should filter records based on data entered', () => {
    component.filterUsers(filterData);
    expect(component.filteredUsers).toEqual([userMock[1]]);

    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const table = element.querySelectorAll('table');
    expect(table[0].rows.length).toBe(2);
  });

  it('should filter zero records based on data entered', () => {
    component.filterUsers(filterNoData);
    expect(component.filteredUsers).toEqual([]);

    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const table = element.querySelectorAll('table');
    expect(table[0].rows.length).toBe(1);
  });

  it('should not show any record if service returns error', () => {
    component.isError = true;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const table = element.querySelectorAll('table');
    expect(table[0]).toEqual(undefined)
  });
});
