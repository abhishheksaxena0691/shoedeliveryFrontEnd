import { AuthService } from './../../guard/auth.service';
import { DeliveryService } from './../../delivery/delivery.service';
import { ApiLinkService } from './../../shared/api-link.service';
import { DashboardService } from './../../dashboard/dashboard.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ShopingService } from '../shoping.service';
import 'sweetalert2/src/sweetalert2.scss';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { from } from 'rxjs';
import { groupBy, mergeMap, reduce, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  classifiedForm: FormGroup;
  addClassifiedTemplate: boolean = false;
  public uFrm  =  new FormData();
public selectedFile = "";
public fileNames = [];
imagePath: any = "";
public imgURL: any = [];
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '100px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',

      enableToolbar: false,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

    uploadUrl: 'https://personal.softdocket.com/api/comunication/imageupload123',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [ 'undo',
      'redo',

      'underline',
      'strikeThrough',
      'subscript',
      'superscript',

      'indent',
      'outdent',

      'heading',
      'fontName'],
      ['fontSize','backgroundColor',
      'customClasses',
      'link',
      'unlink',
      'insertImage',
      'foregroundColorPicker-',
      'insertVideo',
      'insertHorizontalRule',
      'removeFormat',
      'toggleEditorMode', 'superscript', 'strikethrough', 'subscript']


    ]

};
platformMobile: boolean = false;
  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, public fetch: ShopingService,  private dasboard: DashboardService,  private api: ApiLinkService, public deliveryService: DeliveryService, private auth: AuthService) { }

  ngOnInit() {
    if (window.innerWidth < 800) {
      this.platformMobile = true;
    }
    this.getProfileInfo();
    this.classifiedForm  = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      keyFeatureOne: [''],
      keyFeatureTwo: ['' ],
      keyFeatureThree: ['' ],
      brand: ['', Validators.required]
    });

  }
  public uploadedVideo: any ="";
public uFrmvideo  =  new FormData();
modalRef: BsModalRef;
imageUploadPercent: any = 0;

uploadClassifiedVideo (event, template: TemplateRef<any>) {

  this.modalRef = this.modalService.show(template);

 for (let i=0; i < event.target.files.length; i++ ) {

    const fileName = event.target.files[i].name.split('.');
    let fName = fileName[0].toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    this.selectedFile = fName+"-"+Date.now().toString()+'.'+fileName[fileName.length - 1];

    this.fileNames.push({"name": this.selectedFile, "extension": event.target.files[i].name.split('.').pop()})

    this.uFrmvideo.append('forumPhoto', event.target.files[i], this.selectedFile);
    this.uploadedVideo = this.selectedFile;

 }

 this.fetch.uploadImg(this.uFrmvideo).subscribe((imageData:any) => {

  this.imageUploadPercent = (((imageData.loaded) / imageData.total)*100).toFixed(2);
  if ((imageData.loaded != undefined) && (imageData.loaded == imageData.total)) {
    this.modalRef.hide();
    this.uFrmvideo  =  new FormData();
    this.uploadedVideo = this.selectedFile;
    swal.fire({
      title: "Uploaded successfully.",
      text: "",
      icon: 'success',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  } else {

  }

});
 }
 uploadClassifiedattachment (event) {

    for (let i=0; i < event.target.files.length; i++ ) {

        const fileName = event.target.files[i].name.split('.');
        let fName = fileName[0].toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
        this.selectedFile = fName+"-"+Date.now().toString()+'.'+fileName[fileName.length - 1];

        this.fileNames.push({"name": this.selectedFile, "extension": event.target.files[i].name.split('.').pop()})

        this.uFrm.append('classifiedImages', event.target.files[i], this.selectedFile);
        var mimeType = event.target.files[i].type;
        if (mimeType.match(/image\/*/) == null) {

          return;
        }

        var reader = new FileReader();
        this.imagePath = event.target.files[i];
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (_event) => {
          this.imgURL.push(reader.result);
        }
    }
 }

 objArray:any = [];
 selectCategory (val) {
  this.setClassified = val;
  if (val == '') {
    this.objArray = [];
  }

}
 addProduct (template: TemplateRef<any>) {

  this.imageUploadPercent = 0;
  const data = this.classifiedForm.value;
  data["fileName"] = this.fileNames;
  data["ownerNumber"] = this.profInfo.mobileNo;
  data["SenderName"] = this.profInfo.fstName + ' ' + this.profInfo.lstName;
  data["companyName"] = this.profInfo.companyName;
  data["status"] = "open";
  data["createdOn"] = new Date().getTime();
  data["currentIndexId"] = this.currentIndexId;
  let url ="product/addProduct";
  let msg = "Product add successfully.";
  if (this.editProductStatus) {
    data["nameId"] = data.name.toLowerCase();
     msg = "Product edit successfully.";
    url ="product/editProduct";

  }

  this.fetch.addProduct(data, url, this.auth.getLogged()).subscribe((data1: any) => {

    if (data1.status != 410) {
        this.classifiedForm.reset();
        this.fileNames = [];
        swal.fire({
          title: msg,
          text: "",
          icon: "success"
        });
        this.fetch.uploadclassifiedImage(this.uFrm).subscribe(() => {

          this.uFrm =  new FormData();
          this.imgURL =[];
          this.uploadedVideo = "";
          this.imageUploadPercent = (((data.loaded) / data.total)*100).toFixed(2);
          if (data.loaded == data.total) {

          } else {

          }

        });
    }
  }, (error) => {
    swal.fire({
      title: "Product Already exit.",
      text: "",
      icon: 'warning',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  });

}
public profInfo: any = {};
public setImageName: any = "";
getProfileInfo() {
  this.profInfo = {};

  this.dasboard.getProfInfo(this.auth.getLogged()).subscribe(
    res => { this.profInfo = res;
      this.myproduct(false);
      this.dasboard.setProfileInfo(this.profInfo);
    },
    err => { }
  )
}

openVideo(template: TemplateRef<any>, data){

  this.modalRef = this.modalService.show(template);

  this.setImageName = data.name;
}

myproduct (type) {
  this.addClassifiedTemplate = type;
  this.myOrderStatus = type;
  if (!type) {
    this.detailClassifiedStatus = true;
    this.getMyProduct();
  } else {
    this.classifiedForm.reset();
    this.myOrderStatus = false;
    this.addClassifiedTemplate = true;
  }

}

public allProduct :any = [];
public allProductWithoutCategory:any = [];
public loadingTrue = false;
getMyProduct() {
  this.loadingTrue = true;

  this.fetch.getAllProduct({"number":  this.profInfo.mobileNo}, this.auth.getLogged()).subscribe((data) => {
    this.loadingTrue = false;
    this.allProductWithoutCategory = data;
    this.filterProductByCategory();

  });
}
removeVideo() {
      const index = this.fileNames.findIndex((data:any) => data.extension == 'mp4');
      this.fileNames.splice(index, 1);
      this.uploadedVideo = "";
}

public editProductStatus: boolean = false;
public currentIndexId: any = "";
public editfileNames: any = [];
public nameId: any = "";
editProduct (data: any) {

  this.currentIndexId = data.doc._id;
  this.nameId = data.doc.nameId;
  this.editProductStatus = true;
  this.addClassifiedTemplate = true;
  this.selectCategory(data.doc.category);
  this.classifiedForm.patchValue({
                                "name":data.doc.name ,
                                "category":data.doc.category ,
                                "subcategory":data.doc.subcategory ,
                                "price":data.doc.price ,
                                "description":data.doc.description ,
                                "quantity":data.doc.quantity ,
                                "keyFeatureOne":data.doc.keyFeatureOne ,
                                "keyFeatureTwo":data.doc.keyFeatureTwo ,
                                "keyFeatureThree":data.doc.keyFeatureThree ,
                                "brand":data.doc.brand ,
                                "showNumber":data.doc.showNumber
  });
  this.fileNames = data.doc.fileName;
  const index = data.doc.fileName.findIndex((data:any) => data.extension == 'mp4');
  this.imgURL =  data.doc.fileName.filter((data:any) => data.extension != 'mp4');

  if (index > -1) {
  this.uploadedVideo = data.doc.fileName[index].name;
  }

}

removeClassified (index) {
  this.fileNames.splice(index, 1);
  this.imgURL.splice(index, 1);
}

removeClassifiedEdit (index) {
  this.editfileNames.splice(index, 1);

}
public detailClassifiedStatus: boolean = true;
public detailedImages: any = [];
public detailPageData: any = [];

public ratingPercentage: any = 0;
detailProduct (item) {

  this.detailPageData = item;
  this.detailedImages = this.detailPageData.doc.fileName;
  if (this.detailPageData.doc.comment != undefined) {
    this.detailPageData.doc.comment.reverse();
  } else {
    this.detailPageData.doc.comment = [];
  }
  this.detailClassifiedStatus = false;
  this.ratingPercentage = (this.detailPageData.averageRating/5) * 100;
}

public setCurrentIndexImage = 0;
setCurrentImage(index) {
  this.setCurrentIndexImage = index;
}

deleteProduct(id, index) {

  swal.fire({
    title: "Delete Product",
    text: "Are you sure you want to delete.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Yes !',
    cancelButtonText: 'No'
  }).then((isConfirm) => {
    if (isConfirm.isConfirmed) {
        this.fetch.delProduct({id:id}).subscribe((data: any) => {
          this.allProduct.splice(index, 1);
          swal.fire({
            title: "Deleted Successfullt",
            text: "",
            icon: "success"
          });
        })
    }
  })
}
public orderList: any = [];
public myOrderStatus: boolean = false;
public allOrderList: any = [];

public orderLoading: boolean = false;


myorders () {
  this.myOrderStatus =true;
  this.currentTab = 1;
  this.orderLoading = true;
  this.fetch.myorder(this.auth.getLogged()).subscribe((data: any) => {
     this.allOrderList = JSON.parse(JSON.stringify(data));
      this.orderLoading = false;

    this.changeTab(1, 'open');
  });
}

updateStatus (id, type, index,j) {
  let data = {};
       data = {"id": id, "value":{status: type}};
  if (type == 'acceptedByMerchant') {
   data = {"id": id, "value":{status: type, list: this.orderList[j].values[index].list, "totalamount": this.orderList[j].values[index].totalamount} };
  }
  this.fetch.acceptedInvoice(data).subscribe((data: any) => {
    this.orderList[j].values[index].status = type;
    swal.fire({
      title: "Updated successfully.",
      text: "",
      icon: 'success',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  });
}

public currentTab : any = 1
changeTab (type, val) {
  this.currentTab = type;
  let currentOrderData = [];
  if (val == 'acceptedByMerchant') {
    currentOrderData = this.allOrderList.filter((d:any) => d.status == 'acceptedByMerchant' || d.status == 'invoicerequestByretailer');
  } else {
    currentOrderData = this.allOrderList.filter((d:any) => d.status == val);
  }
  const source = from(currentOrderData);

source.pipe(
 groupBy((person: any) => person.orderId),
 mergeMap(group => group
   .pipe(
     reduce((acc, cur) => {
         acc.values.push(cur);
         return acc;
       },
       { orderId: group.key, values: [] }
     )
   )
 ),
 toArray()
).subscribe(val => {

  this.orderList = val;


});

}

InvoiceSend (data, type, index, j) {

  let selectedProduct = [];

  data.productList.map((d: any) => {
    selectedProduct.push({"name": d.name, "quantity": data.cart[d.name.toLowerCase()], "price": d.price});
  });

  if (data.discount == undefined) {
    data.discount = 0;
  }

  const requestData = {"id": data._id, "value":{status: type}, "data": data };

  this.fetch.InvoiceSend(requestData).subscribe(() => {
    this.orderList[j].values[index].status = type;
    swal.fire({
      title: "Updated successfully.",
      text: "",
      icon: 'success',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    });

          this.dasboard.createNewInvoice({"selectedProducts": selectedProduct, "company":this.profInfo.companyName, "type": "shop", "totalamount": (data.totalamount - data.discount).toString()}).subscribe(
          res => {
                res["mobilenumber"] = data.senderNumber;
                res['domain'] = this.profInfo.domain;
                res['companyName'] = this.profInfo.companyName;
                res['type'] = 'shop';
                res['totalamount'] = (data.totalamount - data.discount);
                res['shippingAddress'] =  data.address;
                this.deliveryService.generateImageNewInvoice(res).subscribe(() => {})
          },
          err => {

          }
        )
  });
}

public discount:any = 0;

applyDiscount (id, index,j) {
  if ( this.orderList[j].values[index].totalamount > this.discount && parseInt(this.discount) > 0) {
    this.fetch.updateDiscount({"id": id, "val": {"discount": parseInt(this.discount)}}).subscribe(() => {

      //this.orderList[j].values[index].totalamount = parseInt(this.orderList[j].values[index].totalamount) - parseInt(this.discount);
      this.orderList[j].values[index]['discount'] = this.discount;
    });
} else {

  swal.fire({
    title: "Discount shoud not be greater than total amount",
    text: "",
    icon: 'warning',
    timer: 2000,
    showCancelButton: false,
    showConfirmButton: false,
  });
}
}

updateValue (index, value) {
  //this.orderList[j].values[index].totalamount = this.orderList[j].values[index].totalamount - parseInt(value);
  this.discount = parseInt(value);
}

removeProduct (index, key, type,j) {

  if (type) {
  delete this.orderList[j].values[index].list[key];
  } else {
    this.orderList[j].values[index].list[key] = this.orderList[j].values[index].productList.filter((data:any) => data.name.toLowerCase() == key.toLowerCase())[0].price;
  }
  this.orderList[j].values[index].totalamount = 0;
  Object.keys(this.orderList[j].values[index].list).forEach((key, value:any) => this.orderList[j].values[index].totalamount += (this.orderList[j].values[index].list[key] * this.orderList[j].values[index].cart[key]));

}

public setClassified: any = "category1";
public subCategoryClassified: any = "subCategorytype11";
public selectedClassified: any = "";
public ClassifiedListData: any = [];
public subCategoryClassifiedList: any = {
  "category2": [{"name":"Staples", images: "staples.jpg","type":"subCategorytype21"},
                {"name":"Snacks & Beverages", images: "snackbreverages.jpg", "type":"subCategorytype22"},
                {"name":" Packaged Food", images: "snackbreverages.jpg", "type":"subCategorytype23"},
                {"name":"Personal & Baby Care", images: "personalandbabycare.png", "type":"subCategorytype24"},
                {"name":"Household Care", images: "householdcare.jpg", "type":"subCategorytype25"},
                {"name":"Dairy & Eggs", images: "dairyandeggs.jpg","type":"subCategorytype26"},
                {"name":"Home & Kitchen", images: "homekitchen.jpg","type":"subCategorytype27"},
                {"name":"Fruits", images: "fruitvegetable.jpg","type":"subCategorytype91"},
                {"name":"Vegetable", images: "fruitvegetable.jpg","type":"subCategorytype92"}],

  "category4": [{"name":"Mens Top Wear", images: "menstopwear.jpg","type":"subCategorytype41"},
                {"name":"Mens Bottam Wear", images: "mensbottomwear.jpg", "type":"subCategorytype42"},
                {"name":"Women Eiths", images: "womenethics.jpg", "type":"subCategorytype43"},
                {"name":"Women western", images: "womenwestern.jpg", "type":"subCategorytype44"},
                {"name":"Mens foot wear", images: "menfoottwear.jpg", "type":"subCategorytype45"},
                {"name":"Women foot wear", images: "womenfootwear.jpg","type":"subCategorytype46"},
                {"name":"Watches and Accesories", images: "watchesaccesories.jpg","type":"subCategorytype47"},
                {"name":"Bags,Suitcase", images: "bagsuit.jpg","type":"subCategorytype48"},
                {"name":"Boys Dress", images: "boysdress.jpg","type":"subCategorytype49"},
                {"name":"Girls Dress", images: "girlsdress.jpg","type":"subCategorytype410"}],

  "category5": [{"name":"Audio", images: "audio.jpg","type":"subCategorytype51"},
               {"name":"Camera and accessories", images: "cameraassecories.jpg", "type":"subCategorytype52"},
               {"name":"Computer Phripherals", images: "computerperipheral.jpg", "type":"subCategorytype53"},
               {"name":"Laptop and desktop", images: "laptop.jpg", "type":"subCategorytype54"},
               {"name":"Laptop Accesories", images: "laptopaccesories.jpg", "type":"subCategorytype55"},
               {"name":"Health and personal care", images: "healthcare.jpg","type":"subCategorytype56"},
               {"name":"Power bank", images: "powerbank.jpg","type":"subCategorytype57"},
               {"name":"Storage", images: "storage.jpg","type":"subCategorytype58"},
               {"name":"Smart wearable", images: "smartwear.jpg","type":"subCategorytype59"},
               {"name":"Smart home automation", images: "smarthome.jpg","type":"subCategorytype510"},
               {"name":"Tablets and Accessories", images: "tabletaccesories.jpg","type":"subCategorytype511"},
               {"name":"Television", images: "tv.jpg","type":"subCategorytype71"},
               {"name":"Washing Mechine", images: "WashingMechine.jpg","type":"subCategorytype72"},
               {"name":"Air Conditioner", images: "aircondition.jpg","type":"subCategorytype73"},
               {"name":"Refrigerator", images: "refrigerator.jpg","type":"subCategorytype74"},
               {"name":"Kitchen Appliances", images: "kitchenappliances.jpg","type":"subCategorytype75"},
               {"name":"Home Appliances", images: "homeappliances.jpg","type":"subCategorytype76"},
               {"name":"Mobile less 5000", images: "mobile.jpg","type":"subCategorytype31"},
               {"name":"Mobile accessories", images: "mobile.jpg","type":"subCategorytype32"},
               {"name":"Mobile Less then 10000", images: "mobile.jpg","type":"subCategorytype33"},
               {"name": "Mobile Less then 15000", images: "mobile.jpg","type":"subCategorytype34"},
               {"name":"Mobile Price 15K -30K", images: "mobile.jpg","type":"subCategorytype35"},
               {"name":"Mobile Price 30000 - 50K", images: "mobile.jpg","type":"subCategorytype36"},
               {"name":"Mobile Price 50k and above", images: "mobile.jpg","type":"subCategorytype37"}
             ],
  "category6": [{"name":"Home Furnishing", images: "homefurniture.jpg","type":"subCategorytype61"},
               {"name":"Living room", images: "livingroom.jpg","type":"subCategorytype62"},
               {"name":"Kitchen and Dining", images: "kitchendinning.jpg","type":"subCategorytype63"},
               {"name":"Bed Room", images: "bedroom.jpg","type":"subCategorytype64"},
               {"name":"Tool & Utility", images: "toolutility.jpg","type":"subCategorytype65"},
               {"name":"Lighting & Electrical", images: "lighting.jpg","type":"subCategorytype66"},
               {"name":"Cleaning and Bath", images: "cleanbath.jpg","type":"subCategorytype67"},
               {"name":"Kids Furniture", images: "kidsroom.jpg","type":"subCategorytype68"},
               {"name":"Pets and gardening", images: "Petsandgardening.jpg","type":"subCategorytype69"}
               ],

 "category8": [
               {"name":"Beauty and Personal care", images: "beautyandpersonal.jpg","type":"subCategorytype81"},
               {"name":"Mens Grooming", images: "MensGrooming.jpg","type":"subCategorytype82"},
               {"name":"Food and drinking", images: "foodanddrinking.jpg","type":"subCategorytype83"},
               {"name": "Baby Care", images: "babycare.jpg","type":"subCategorytype84"},
               {"name":"Nutrition and Health Care", images: "nutritionhealth.jpg","type":"subCategorytype85"},
               {"name":"Toys and School Supplies", images: "ToysandSchoolSupplies.jpg","type":"subCategorytype86"},
               {"name":"Sports and Fitness", images: "sportsandfitness.jpg","type":"subCategorytype87"},
               {"name":"Books and Music", images: "booksmusic.jpg","type":"subCategorytype88"},
               {"name":"Stationary & Office supplies", images: "StationeryOffice.jpg","type":"subCategorytype89"},
               {"name":"Saftey and Hygiene Essentials", images: "SafetyHygiene.jpg","type":"subCategorytype810"}
             ],

 "category10": [{"name":"Ayush", images: "Ayush.jpg","type":"subCategorytype101"},
               {"name":"Baby Essential", images: "BabyEssential.jpg","type":"subCategorytype102"},
               {"name":"Covid Essential", images: "CovidEssential.jpg","type":"subCategorytype103"},
               {"name":"Doctor", images: "Doctor.jpg","type":"subCategorytype104"},
               {"name":"Eye Wear", images: "EyeWear.jpg","type":"subCategorytype105"},
               {"name":"Fitness", images: "Fitness.jpg","type":"subCategorytype106"},
               {"name":"Lab test", images: "Lab_test.jpg","type":"subCategorytype107"},
               {"name":"Medical devices", images: "Medicaldevices.jpg","type":"subCategorytype108"},
               {"name":"Medicine", images: "Lab_test.jpg","type":"subCategorytype109"},
               {"name":"Personal care", images: "Personalcare.jpg","type":"subCategorytype110"},
               {"name":"Surgical", images: "Surgical.jpg","type":"subCategorytype111"},],

 "category11": [
               {"name":"Haire care", images: "Hairecare.jpg","type":"subCategorytype201"},
              {"name":"Makeup", images: "makeup.jpg","type":"subCategorytype202"},
              {"name":"Massages", images: "Massages.jpg","type":"subCategorytype203"},
              {"name":"Pedicure & minicure", images: "Pedicure&minicure.jpg","type":"subCategorytype204"},
              {"name":"Skin care", images: "Skincare.jpg","type":"subCategorytype205"},
              {"name":"wax & Thread", images: "wax&Thread.jpg","type":"subCategorytype206"}],

 "category12": [
             {"name":"car& bike service", images: "car&bikeservice.jpg","type":"subCategorytype301"},
             {"name":"Electronics & Appliances", images: "Electronics&Appliances.jpg","type":"subCategorytype302"},
             {"name":"Home Clean", images: "homeclean.jpg","type":"subCategorytype303"},
             {"name":"Packers & Movers", images: "packers&MOvers.jpg","type":"subCategorytype304"},
             {"name":"Painting and interior", images: "paintingandinterior.jpg","type":"subCategorytype305"},
             {"name":"Pest Control", images: "pestControl.jpg","type":"subCategorytype306"},
             {"name":"Repair & Services", images: "Repair&Services.jpg","type":"subCategorytype306"}],

 "category13": [
               {"name":"Title Search", images:"TitalSearch.jpg", "type":"subCategorytype402"},
               {"name":"Banking/Finance Matters", images:"Banking&Finance Matters.jpg", "type":"subCategorytype403"},
               {"name":"Litigation Matters", images:"Litigation Matters.jpg", "type":"subCategorytype404"},
               {"name":"Partition of Property", images:"Partition of Property.jpg", "type":"subCategorytype405"},
               {"name":"Income Tax", images:"Income Tax.jpg", "type":"subCategorytype406"},
               {"name":"Landlord Tenant Dispute", images:"Landlord Tenant Dispute.jpg", "type":"subCategorytype407"},
               {"name":"Real Estate Service", images:"Real Estate Service.jpg", "type":"subCategorytype408"},
               {"name":"Succession Certificate", images:"Succession Certificate.jpg", "type":"subCategorytype409"},
               {"name":"Developer Claims", images:"Developer Claims.jpg", "type":"subCategorytype410"},
               {"name":"Adverse Possession", images:"Adverse Possession.jpg", "type":"subCategorytype411"},
               {"name":"Corporate Service Advisory", images:"Corporate Service Advisory.jpg", "type":"subCategorytype412"}],

 "category14": [

               {"name":"Civil Contractors", images:"Civil Contractors.jpg", "type":"subCategorytype502"},
               {"name":"Construction Service", images:"Construction Service.jpg", "type":"subCategorytype503"},
               {"name":"Road Construction", images:"Road Construction.jpg", "type":"subCategorytype504"},
               {"name":"Civil Engineering Service", images:"Civil Engineering Service.jpg", "type":"subCategorytype505"},
               {"name":"Surveying", images:"Surveying.jpg", "type":"subCategorytype506"},
               {"name":"Piece Work", images:"Piece Work.jpg", "type":"subCategorytype507"},
               {"name":"Civil Consulation", images:"CivilConsultation.jpg", "type":"subCategorytype508"},
               {"name":"Carpentor", images:"Carpenter.jpg", "type":"subCategorytype509"},
               {"name":"Hardware", images:"Hardware.jpg", "type":"subCategorytype510"}
             ],
 "category15": [
               {"name":"State Board Tution", images:"State Board Tution.jpg", "type":"subCategorytype601"},
               {"name":"Central Board Tution", images:"Central Board Tution.jpg", "type":"subCategorytype602"},
               {"name":"Internation Board", images:"Internation Board.jpg", "type":"subCategorytype603"},
               {"name":"Spoken Language", images:"Spoken Language.jpg", "type":"subCategorytype604"},
               {"name":"Computer Language", images:"Computer Language.jpg", "type":"subCategorytype605"},
               {"name":"Project Instructor", images:"projectcoordinator.jpg", "type":"subCategorytype606"},
             ]
 }

public classifiedListData:any = [];
public ShowMenu: boolean = true;
setFirstCategory (type) {
  this.setClassified = type;
  this.filterProductByCategory();
}
setSecondCategory (type, subCategory) {
  this.setClassified = type;
  this.subCategoryClassified = subCategory;
  this.filterProductByCategoryAndSubCategory();

}

filterProductByCategory()
{

  this.allProduct = JSON.parse(JSON.stringify(this.allProductWithoutCategory.filter((data:any) => data.doc.category == this.setClassified)));

}

filterProductByCategoryAndSubCategory()
{

  this.allProduct = JSON.parse(JSON.stringify(this.allProductWithoutCategory.filter((data:any) => data.doc.category == this.setClassified && data.doc.subcategory == this.subCategoryClassified)));
}

addToTopOffer (val) {

  if (val) {
    this.classifiedForm.patchValue({'category': 'category1'});
    this.classifiedForm.patchValue({'subcategory': 'category1'});
  } else {
    this.classifiedForm.patchValue({'category': null});
    this.classifiedForm.patchValue({'subcategory': null});
  }

}
public arialExpand: any = 0;
showCurrent(i) {
  this.arialExpand = i;
}
}
