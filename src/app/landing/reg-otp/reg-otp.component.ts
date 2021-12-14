import { ShopingService } from './../../shoping/shoping.service';
import { ApiLinkService } from './../../shared/api-link.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-reg-otp',
  templateUrl: './reg-otp.component.html',
  styleUrls: ['./reg-otp.component.scss']
})
export class RegOTPComponent implements OnInit {

  regFrm: FormGroup;
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
  frmSubmit: boolean = false;
  frmBtm: boolean = false;
  pgMsg: any;
  mobileNo: string;
  public imgURL: any = [];
  constructor(private formBuilder: FormBuilder, private api: ApiLinkService, private shop: ShopingService, private route: Router, private aRoute: ActivatedRoute, private fetch: LandingService, private modalService: BsModalService) { }

  ngOnInit() {
    this.regFrm = this.formBuilder.group({
      regMobile: ['', Validators.required],
      otp: ['', Validators.required],

      loyaltyPoint: ['', Validators.required],
      refundPolicy: ['', Validators.required],
      returnPolicy: ['', Validators.required],
      credit: ['', Validators.required],
      address: ['', Validators.required],
      shopAge: ['', Validators.required],
      shopType: ['', Validators.required],
      totalArea: ['', Validators.required],
      doorDelivery: ['', Validators.required],
      description: ['', Validators.required],
      gstNumber: ['', Validators.required],
      alternativenumber: ['', Validators.required]
    });

    this.aRoute.params.subscribe(
      param => {
        this.mobileNo = param['mobile'];
        this.regFrm.patchValue({
          regMobile: this.mobileNo,

        });
      }
    );
  }

  get autoFrm() { return this.regFrm.controls; }

  verifyOn() {
    this.frmSubmit = true;
    this.frmBtm = true;
    console.log(this.regFrm.value);
    if (this.regFrm.invalid) {
      this.frmBtm = false;
      return;
    } else {
      let formObj = this.regFrm.getRawValue();
      formObj['language'] = this.languageSupport;
      formObj['fileName'] =  this.fileNames;
      formObj['logoFile'] = this.logoFile;

      this.fetch.usrVerify(formObj).subscribe(
        res => {
          this.regFrm.reset();
          this.pgMsg = {msg: res, alert: "alert-success"};
          this.shop.uploadclassifiedImage(this.uFrm).subscribe(() => {

            this.uFrm =  new FormData();
            this.imgURL =[];
            this.uploadedVideo = "";
            this.shop.uploadclassifiedImage1(this.uploadLogoImage).subscribe(() => {

              this.uploadLogoImage =  new FormData();
              this.logoFile = "";
              this.logoResult = "";

              setTimeout(() => {
                this.route.navigate(['/']);
              },3500);
            });
          });

        },
        err => { this.pgMsg = {msg: err.error, alert: "alert-danger"}; }
      );
      this.frmSubmit = false;
      this.frmBtm = false;
      setTimeout(() => {
          this.pgMsg = null;
      },3500);
    }
  }

  public uFrm  =  new FormData();
  public selectedFile = "";
  public fileNames = [];
  imagePath: any = "";
  public uploadedVideo: any = "";
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
      console.log(this.fileNames);
      var reader = new FileReader();
      this.imagePath = event.target.files[i];
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (_event) => {
        this.imgURL.push(reader.result);
      }
   }
   }

   public setImageName: any = "";
   modalRef: BsModalRef;
   openVideo(template: TemplateRef<any>, data){

    this.modalRef = this.modalService.show(template);
    console.log(data);
    this.setImageName = data.name;
  }




removeVideo() {

  const index = this.fileNames.findIndex((data:any) => data.extension == 'mp4');

  this.fileNames.splice(index, 1);
  this.uploadedVideo = "";
}


public uFrmvideo  =  new FormData();

imageUploadPercent: any = 0;

uploadClassifiedVideo (event, template: TemplateRef<any>) {
  console.log(event.target);
  this.modalRef = this.modalService.show(template);

 for (let i=0; i < event.target.files.length; i++ ) {

    const fileName = event.target.files[i].name.split('.');
    let fName = fileName[0].toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
    this.selectedFile = fName+"-"+Date.now().toString()+'.'+fileName[fileName.length - 1];

    this.fileNames.push({"name": this.selectedFile, "extension": event.target.files[i].name.split('.').pop()})

    this.uFrmvideo.append('forumPhoto', event.target.files[i], this.selectedFile);
    this.uploadedVideo = this.selectedFile;

 }

 this.shop.uploadImg(this.uFrmvideo).subscribe((imageData:any) => {

  this.imageUploadPercent = (((imageData.loaded) / imageData.total)*100).toFixed(2);
  if ((imageData.loaded != undefined) && (imageData.loaded == imageData.total)) {
    this.modalRef.hide();
    this.uFrmvideo  =  new FormData();
    this.uploadedVideo = this.selectedFile;
    // swal.fire({
    //   title: "Uploaded successfully.",
    //   text: "",
    //   icon: 'success',
    //   timer: 2000,
    //   showCancelButton: false,
    //   showConfirmButton: false,
    // });
  } else {

  }

});
 }
 removeClassified (index) {
  this.fileNames.splice(index, 1);
  console.log(this.fileNames);
  this.imgURL.splice(index, 1);
}

public uploadLogoImage  =  new FormData();
public logoFile: any = "";
public logoResult:any = "";
uploadLogo (event) {


  for (let i=0; i < event.target.files.length; i++ ) {

     const fileName = event.target.files[i].name.split('.');
     let fName = fileName[0].toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
     this.logoFile = fName+"-"+Date.now().toString()+'.'+fileName[fileName.length - 1];
     this.uploadLogoImage.append('logoImage', event.target.files[i], this.logoFile);
     var mimeType = event.target.files[i].type;
     if (mimeType.match(/image\/*/) == null) {

       return;
     }

     var reader = new FileReader();
     this.imagePath = event.target.files[i];
     reader.readAsDataURL(event.target.files[i]);
     reader.onload = (_event) => {
      this.logoResult = reader.result;
     }
  }

  }

  removeLogo () {
    this.logoFile = "";
    this.logoResult = "";

  }
  public languageSupport: any = [];
  onCheckChange (type, val) {
      if (type) {
        this.languageSupport.push(val);
      } else {
        const index = this.languageSupport.findIndex((d:any) => d == val);
        this.languageSupport.splice(index, 1);
      }
  }

}
