import { Component, OnInit } from '@angular/core';
import { FilterData } from 'src/app/interfaces/filter-data.interface';
import { Users } from '../../interfaces/user.interface';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Users[];
  filteredUsers: Users[];
  isLoading = true;
  isError = false;

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe( 
      (usersResponse: Users[]) => {
        this.users = usersResponse;
        this.filteredUsers = this.users;
        this.isLoading = false;
      },
      () => this.isError = true
    );
  }

  filterUsers(filterOptions: FilterData) {
    this.filteredUsers = this.users.filter( user =>
      user[filterOptions.filterField].toLowerCase().indexOf((filterOptions.filter).toLowerCase()) !== -1
    );
  }
}

