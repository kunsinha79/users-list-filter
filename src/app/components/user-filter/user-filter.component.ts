import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterOption } from '../../interfaces/filter-option.interface';
import { filterList } from '../../constants/filterList.constant';
import { FilterData } from 'src/app/interfaces/filter-data.interface';

@Component({
  selector: 'app-users-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {

  filterForm: FormGroup;
  formBuilder: FormBuilder;

  @Output() filterOptions = new EventEmitter<FilterData>();

  options: FilterOption[] = filterList;

  constructor() {
    this.formBuilder = new FormBuilder();

    this.filterForm = this.formBuilder.group({
      filter: [''],
      filterField: ['name']
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .subscribe(value => {
        this.filterOptions.emit(value);
    });
  }
}

