import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserNcService } from './service/userNcs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-ncs',
  templateUrl: './users-ncs.component.html',
  styleUrls: ['./users-ncs.component.css'],
  providers: [UserNcService]
})
export class UsersNcsComponent implements OnInit {

  ncList: Object[];
  busy: Subscription;
  showError = false;
  errorMessage: string;

  constructor(private _userNcService: UserNcService, private _router: Router) {
  }

  ngOnInit() {
    this.getNcAgainstUser();
  }

  private getNcAgainstUser(): void {
    this.busy = this._userNcService.fetchNcsAgaintsUser()
      .subscribe(
      (data) => {
        this.ncList = data;
      },
      (err) => {
        this.showError = true;
        this.errorMessage = err;
      }
      );
  }


  getStatus(status: number): string {
    if (Number(status) === 301) {
      return 'Can be Closed';
    } else if (Number(status) === 302) {
      return 'Pending with Auditor';
    } else {
      return 'Closed';
    }
  }

  isIssueClosed(status: string): boolean {
    return (Number(status) === 303);
  }

  isIssueWithAuditor(status: string): boolean {
    return (Number(status) === 302);
  }

  onResolveNcClick(ncId: number) {
    this._router.navigate(['NcDetail', ncId]);
  }

}
