import { Subscription } from 'rxjs/Subscription';
import { NcDetailService } from './service/NcDetail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nc-detail',
  templateUrl: './nc-detail.component.html',
  styleUrls: ['./nc-detail.component.css'],
  providers: [NcDetailService]
})
export class NcDetailComponent implements OnInit {

  auditInfo: any;
  ncId: number;
  todaysDate: String;
  busy: Subscription;

  constructor(private _userNcRegisterService: NcDetailService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.todaysDate = this.getTodaysDate();
  }

  ngOnInit() {
    this.ncId = this._activatedRoute.snapshot.params['ncId'];
    this.getNcDetailInfo(this.ncId);
  }

  formSubmit(userNcForm: any): void {
    this._userNcRegisterService.updateNcRegister(userNcForm.value)
      .subscribe(
      (data) => {
        if (Boolean(data) === true) {
          alert('Nc updated successfully.');
          this._router.navigate(['UserNcs']);
        }
      },
      (err) => alert(err)
      );
  }

  getNcDetailInfo(ncId: number) {
    this.busy = this._userNcRegisterService.getNcDetailInfo(ncId)
      .subscribe(
      (data) => { this.auditInfo = data; },
      (err) => { console.log(err) }
      );
  }

  getNcStatus(ncStatus: number): boolean {
    return (Number(ncStatus) === 301);
  }


  private getTodaysDate(): String {
    const date: Date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toString();
  }


}
