import { ApiLinkService } from './../../shared/api-link.service';
import { ShopingService } from './../../shoping/shoping.service';
import { DashboardService } from './../../dashboard/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js';
@Component({
  selector: 'app-shopkeeperprofile',
  templateUrl: './shopkeeperprofile.component.html',
  styleUrls: ['./shopkeeperprofile.component.scss']
})
export class ShopkeeperprofileComponent implements OnInit {

  constructor(private aRoute: ActivatedRoute, private shop: ShopingService,  private api: ApiLinkService,  private dasboard: DashboardService) { }
  public profileData: any = {};
  public userProfile:any = {};
  ngOnInit() {
    this.aRoute.params.subscribe(
      param => {

        this.shop.getSopkeeperInfo({"mobileNo": param['mobile']}).subscribe((data:any) => {
          this.profileData = data;
          console.log(this.profileData);

        })
      }
    );
    this.userProfile = this.dasboard.getProfileInfo();
    console.log(this.userProfile);
  }

  public setCurrentIndexImage = 0;
  public reviewMerchant: any = "";
setCurrentImage(index) {
  this.setCurrentIndexImage = index;
}
writeReview () {

  const data = {"parentId": this.profileData._id, "data": {"reveiw": this.reviewMerchant,  "senderName": this.userProfile.fstName + ' ' + this.userProfile.lstName,  "createdOn": new Date().getTime()}};


  this.shop.reviewMerchant(data).subscribe(() => {
    if (this.profileData.comment != undefined) {
      this.profileData.comment.unshift({"reveiw": this.reviewMerchant, "senderName": this.userProfile.fstName + ' ' + this.userProfile.lstName,  "createdOn": new Date().getTime()});
    } else {
      this.profileData["comment"] = [];
      this.profileData.comment.push({"reveiw": this.reviewMerchant, "senderName": this.userProfile.fstName + ' ' + this.userProfile.lstName,  "createdOn": new Date().getTime()});
    }

    this.reviewMerchant = "";
    swal.fire({
      title: "Rating successfully.",
      text: "",
      icon: 'success',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  });
}

}
