import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import * as globals from "../../../../global";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import * as globalsVars from '../../../../global';
import imageCompression from 'browser-image-compression';
import { async } from 'rxjs';
@Component({
  selector: 'app-upload1',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  file=new FormControl('');
  file_data:any='';
  files: any;
  loading = false;
  myForm: FormGroup;
  @Input() is_not_empty = false;
  @Input() url = globals.SERVER_FOR_UPLOAD+'upload-file.php';
  @Input() deleteAll = false;
  @Input() just_for_file = false;
  @Input() for_wp_server = false;
  @Input() src = '';
  @Input() uploads_datas= [];
  @Input() filesPreviews= [];
  @Output() fileUploaded = new EventEmitter<any>();
  @Output() fileDeleted = new EventEmitter<number>();

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer, public fb: FormBuilder) {
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    });
  }


  ngOnInit() {
    // alert(this.url)
    this.init()
  }
  init(){
    this.filesPreviews = []
    if(!this.for_wp_server){
      for(let i = 0; this.uploads_datas && i < this.uploads_datas.length; i++) {
        // this.filesPreviews.push(globals.SERVER+this.uploads_datas[i].file_name);
        this.filesPreviews.push(this.uploads_datas[i].file_name);
      }
    }
    else{
      for(let i = 0; this.uploads_datas && i < this.uploads_datas.length; i++) {
        if(this.uploads_datas[i] === '')
          this.uploads_datas.splice(i,1)
        else
          this.filesPreviews.push(this.uploads_datas[i]);
      }
      if(!this.uploads_datas)
        this.uploads_datas = []
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.deleteAll){
      // alert(this.deleteAll);
      this.deleteTempFiles();
    }
  }
 async fileChange(event) {
    const fileList: FileList = event.target.files;
    if(!this.files){
      this.files = fileList;
    }else {
      const joined = Array.from(this.files).concat(Array.from(fileList));
      this.files = joined;
    }
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++){

        const file = fileList[i];
        console.log('originalFile instanceof Blob', file instanceof Blob); // true
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
        const formData = new FormData();
        if(this.just_for_file){
          this.uploads_datas = []
          this.filesPreviews = []
        }
        if(this.for_wp_server){
          this.imagePreview1(file, i);
          formData.append('mmbyapi_file_upload[]',  file);
          this.file_data=formData;
          this.uploadFile(formData);
         // console.log(window.URL.createObjectURL(file) );
        }
        else{

          const options = {
            maxSizeMB: 1,
            useWebWorker: true
          };
          try {
            const compressedFile = await imageCompression(file, options);
            console.log('compressedFile instanceof Blob', compressedFile, ' ', this.url); // true
            console.log(`originalFile size ${compressedFile.size / 1024 / 1024} MB`);
            this.imagePreview1(compressedFile, i);
            const info={id:2,name:'raja'};
            formData.append('file', compressedFile, compressedFile.name);
            formData.append('mmbyapi_file_upload[]', compressedFile, compressedFile.name);
            formData.append('id','2');
            formData.append('tz',new Date().toISOString());
            formData.append('update','2');
            formData.append('info',JSON.stringify(info));
            this.file_data=formData;
            this.uploadFile(formData);
            console.log(window.URL.createObjectURL(compressedFile) );
            console.log('finfo',compressedFile.name,file.size,compressedFile.type);
          }catch(error){

          };
        }
          // this.files.push(file);
        //check whether file is selected or not
        //get file information such as name, size and type
        //max file size is 4 mb
       /* if((file.size/1048576)<=4)
        {
          const formData = new FormData();
          const info={id:2,name:'raja'}
          formData.append('file', file, file.name);
          formData.append('id','2');
          formData.append('tz',new Date().toISOString());
          formData.append('update','2');
          formData.append('info',JSON.stringify(info));
          this.file_data=formData;
          this.uploadFile(formData);
          console.log(window.URL.createObjectURL(file) );

        }else{
          //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
        }*/
      }
    }
  }
  getPic(file){
    return window.webkitURL.createObjectURL(file);
  }
  imagePreview1(file,i) {
    //const file = (e.target as HTMLInputElement).files[0];

    this.myForm.patchValue({
      img: file
    });

    this.myForm.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filesPreviews.push(reader.result as string);
      // if(i > 0){
      // }else {
      //   this.filesPreviews[i] = reader.result as string;
      // }
    };
    reader.readAsDataURL(file);
  }

  //@ts-ignore
  preview(file) {
    // if (files.length === 0)
    //   return;

    let mimeType = file.type// files[0].type;
    if (mimeType.match(/image\/*/) == null) {

      return "Only images are supported.";
    }

    let reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      const  url = this.domSanitizer.bypassSecurityTrustUrl(reader.result.toString());
      // console.log(reader.result);
      return reader.result as string;
    };
  }

  deleteTempFiles(){
    for (let index = 0; index < this.uploads_datas.length; index++) {
      this.deleteFile(index);
    }
  }
  deleteFile(index,all = false)
  {
  this.remmovefile(index)
  if(this.for_wp_server)
  {
    return
  }
    // eslint-disable-next-line max-len
    let  params = new HttpParams();
  //  params = params.append('filename', this.uploads_datas[index].file_name);
  this.uploads_datas[index].message = 'no';
  // console.log('this.uploads_datas1 ', this.uploads_datas[index]);
  // console.log('this.uploads_datas1 ', this.uploads_datas);
  this.remmovefile(index)
  //a gerer
   /*this.http.post<any>(globals.SERVER_FOR_UPLOAD+'delete-file.php', JSON.stringify({'filename': this.uploads_datas[index].file_name} )).subscribe(value => {
     this.uploads_datas.splice(index,1);
      console.log(value);
      if(value.deleted && all){
        // this.remmovefile(index)
      }
    });*/

  }
  remmovefile(index){
        this.filesPreviews.splice(index,1);
        // delete this.uploads_datas[index];
      //  delete this.filesPreviews[index];
        console.log('this.uploads_datas ', this.uploads_datas);
        console.log('this.filesPreviews ', this.filesPreviews);
        this.deleteFileEvent(index);
  }
  uploadFile(file_data)
  {
    // alert(this.url+ ' '+ file_data)
    this.http.post(this.url,file_data)
      .subscribe(res => {
        this.uploads_datas.push(res) ;
        //send success response
        console.log('file uploaded ', this.url);
        console.log('file uploaded ' , res);
        this.uploadFileEvent(res);
        this.is_not_empty = true;
      }, (err) => {
        //send error response
      });
  }

  uploadFileEvent(value: any) {
    this.fileUploaded.emit(value);
  }
  deleteFileEvent(value: number) {
    this.fileDeleted.emit(value);
  }
  isLoading(index){
    // alert('dddd')
    // console.log("i < uploads_datas && uploads_datas.length", index, ' > ', this.uploads_datas.length,'   ' , index > this.uploads_datas.length)
    return index + 1 >  this.uploads_datas && this.uploads_datas.length || (index + 1 <= this.uploads_datas.length &&  this.uploads_datas[index].message === 'no') ;
  }
}
