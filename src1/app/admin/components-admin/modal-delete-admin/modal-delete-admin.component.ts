import { ItemProposedService } from 'src/app/service/item_proposed/item-proposed.service';
import { MealsService } from './../../../service/meals/meals.service';
import { DriveBaseService } from './../../../service/drive-base.service';
import { ArticleService } from './../../../service/article/article.service';
import { AdsService } from './../../../service/ads/ads.service';
import { RouteService } from './../../../service/route/route.service';
import { DriveService } from './../../../service/drive/drive.service';
import { RouteChecklistService } from './../../../service/route_checklist/route-checklist.service';
import { ReservationService } from './../../../service/reservation/reservation.service';
import { Reservation } from './../../../model/Model/Reservation';
import { PointService } from 'src/app/service/point/point.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { File_Checklist } from 'src/app/model/Model/Folder_Checklist';
import { FileChecklistService } from 'src/app/service/file_checklist/file-checklist.service';
import { DataType } from 'src/global';
import { ItemChecklistCategoryService } from 'src/app/service/item_checklist_category/item-checklist-category.service';

@Component({
  selector: 'app-modal-delete-admin',
  templateUrl: './modal-delete-admin.component.html',
  styleUrls: ['./modal-delete-admin.component.css']
})
export class ModalDeleteAdminComponent implements OnInit {


  @Input() datas:any []
  @Input() dataType:any
  loading = false
  // @Output() onFileDeleted = new EventEmitter<File_Checklist>()
  @Output() onDeleted = new EventEmitter<any>()

  constructor( private pointService: PointService,
    private reservationService: ReservationService,
    private routeService: RouteService,
    private itemChecklistCategoryService: ItemChecklistCategoryService,
    private mealsService: MealsService,
    private adsService: AdsService,
    private pr0posedItemService: ItemProposedService,
    private articleService: ArticleService,
    private driveService: DriveBaseService) { }

  ngOnInit(): void {
  }
  setData(datas:any , dataType:any=null){
    this.dataType = dataType
    // alert(this.dataType === DataType.Item_Category)
    this.datas = datas
    setInterval(() => {
      // console.log(JSON.stringify(datas))
    }, 1000);
  }

  deleteFolder(id){
    // var d = document.getElementById("close_btn");
    // console.log(d)
    // setTimeout(() => {
    //   d.click();
    // }, 1500);
    //  return
    console.log("deleted ", this.dataType ,' ',this.datas)
    for (let index = 0; index < this.datas.length; index++) {
      const element = this.datas[index];

      if(this.dataType === DataType.Point){
        this.pointService.delete(this.datas[index].id).subscribe(result => {
          console.log("deleted point ", result)
          if(index == this.datas.length - 1)
              this.onDeleted.emit(this.datas)
          this.finishTraitement()
      })
      }
      if(this.dataType === DataType.Drive_Base){
        this.driveService.delete(this.datas[index].id).subscribe(result => {
          console.log("deleted drive ", result)
          if(index == this.datas.length - 1)
            this.onDeleted.emit(this.datas)
          this.finishTraitement()
          })
      }
      if(this.dataType === DataType.Reservation){
        // this.reservationService.delete(this.datas[index].id).subscribe(result => {
          // alert('ok')
          //************************ for test ****************************************/
          // this.onDeleted.emit(this.datas)
          // this.finishTraitement()
          // return

          this.reservationService.delete(this.datas[index].id).subscribe(result => {
          console.log("deleted reservation ", result)
          if(index == this.datas.length - 1)
            this.onDeleted.emit(this.datas)
            this.finishTraitement()
          })
      }
      if(this.dataType === DataType.Route){
        this.routeService.delete(this.datas[index].id).subscribe(result => {
          console.log("deleted route ", result)
          if(index == this.datas.length - 1)
            this.onDeleted.emit(this.datas)
          this.finishTraitement()
        })
      }
      if(this.dataType === DataType.Ads){
        this.adsService.delete(this.datas[index].id).subscribe(result => {
          console.log("deleted Ads ", result)
          if(index == this.datas.length - 1)
            this.onDeleted.emit(this.datas)
            this.finishTraitement()
        })
      }
      if(this.dataType === DataType.Article){
        console.log("deleted Article ")
        this.articleService.delete(this.datas[index].id).subscribe(result => {
          console.log("deleted Article ", result)
          if(index == this.datas.length - 1)
            this.onDeleted.emit(this.datas)
            this.finishTraitement()
        })
      }
      if(this.dataType === DataType.MealCategory){
        console.log("deleted Plasir ")
        this.mealsService.delete(this.datas[index].id).subscribe(result => {
          console.log("deleted Plasir ", result)
          if(index == this.datas.length - 1)
            this.onDeleted.emit(this.datas)
            this.finishTraitement()
        })
      }
      if(this.dataType === DataType.Item_Category){
        console.log("deleted Plasir ")
        this.itemChecklistCategoryService.delete(this.datas[index].id).subscribe(result => {
          console.log("deleted Plasir ", result)
          if(index == this.datas.length - 1)
            this.onDeleted.emit(this.datas)
            this.finishTraitement()
        })
      }
      if(this.dataType === DataType.Item_Proposed){
        console.log("deleted Item_Proposed ")
        this.pr0posedItemService.delete(this.datas[index].id).subscribe(result => {
          console.log("deleted Item_Proposed ", result)
          if(index == this.datas.length - 1)
            this.onDeleted.emit(this.datas)
            this.finishTraitement()
        })
      }
    }
  }

  finishTraitement(){
    this.close()
    var d = document.getElementById("close_btn");
    // alert(d)
     d?.click();
  }
  close(){
    this.loading =false
    var btnclose = document.getElementById("close_btn")
    setTimeout(() => {
      btnclose?.click()
    }, 1500);
  }

}
