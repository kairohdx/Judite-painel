import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../shared/services/company.service';
import { Company } from '../../shared/models/company.model';
import { AuthContextService } from '../../shared/services/authContext.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.css'
})
export class CompaniesListComponent implements OnInit {
  companies: Company[] = [];
  displayedColumns = ['name', 'sector', 'actions'];

  constructor(private companyService: CompanyService, private authContext: AuthContextService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.authContext.setUser(user);
    });
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    });
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id).subscribe(() => {
      this.loadCompanies();
    });
  }
}
