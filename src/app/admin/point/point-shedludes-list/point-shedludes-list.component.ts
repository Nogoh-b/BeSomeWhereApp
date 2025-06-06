import { filterData, SearchType } from 'filter-data';
import { DriveBaseService } from './../../../service/drive-base.service';
import { FormBuilder } from '@angular/forms';
import { ToastComponent } from './../../../shared/toast/toast.component';
import { FormGroup } from '@angular/forms';
import { Drive_Base } from './../../../model/Model/Drive_Base';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataType, per_page } from 'src/global';
import { RouteService } from 'src/app/service/route/route.service';

@Component({
  selector: 'app-point-shedludes-list',
  templateUrl: './point-shedludes-list.component.html',
  styleUrls: ['./point-shedludes-list.component.css']
})
export class PointShedludesListComponent implements OnInit {

  id:string
  drive_base: Drive_Base[]
  results: Drive_Base[]
  pagination
  currentPage: number =  0
  per_page: number = per_page;
  sort_option: string
  search_option: string
  checks_table = []
  loading_d = false

  selected_data: any[] = []
  datatype = DataType.Drive_Base
  // formPoint: FormGroup
  @ViewChild(ToastComponent) toast_c: ToastComponent;

   // Limite du nombre de pages à afficher dans la pagination
   maxVisiblePages: number = 5;


 
   showFirstPage() {
     return this.currentPage > Math.floor(this.maxVisiblePages / 2);
   }
 
   showLeftEllipsis() {
     return this.currentPage > Math.floor(this.maxVisiblePages / 2);
   }
 
   getMiddlePages() {
     const start = Math.max(0, this.currentPage - Math.floor(this.maxVisiblePages / 2));
     const end = Math.min(this.pagination.length, start + this.maxVisiblePages);
     return Array.from({ length: end - start }, (_, i) => start + i);
   }
 
   showRightEllipsis() {
     return this.currentPage < this.pagination.length - Math.ceil(this.maxVisiblePages / 2) - 1;
   }
 
   showLastPage() {
     return this.currentPage < this.pagination.length - Math.ceil(this.maxVisiblePages / 2) - 1;
   }

  constructor(private fb: FormBuilder,
    private driveBaseService: DriveBaseService,
    private routeService : RouteService,
    private router: Router ,
    private route:ActivatedRoute) {

      const routeParams = this.route.snapshot.paramMap;
      this.id = routeParams.get('id');
      this.driveBaseService.get({station: this.id}).subscribe(drive_base =>{
        this.drive_base = this.sortByDateDescending(drive_base)
        this.results = this.sortByDateDescending(drive_base)
        console.log ( 'drive_base111 ', drive_base)

        let a: number = Number((drive_base.length/per_page))
        // this.checks_table = init_selection(drive_base)
        //  alert(a)
        this.pagination = new Array(Math.ceil(a));
        this.init_selection(this.getDrive_Base())
      })
    }
    change(){
      console.log(this.sort_option)
    }
    sortByDateDescending(dataArray: Drive_Base[]) {
      return dataArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  
    navigateToPage(i){
      if(i === ( this.pagination && this.pagination.length) || i < 0  )
        return
        this.currentPage = i
        setTimeout(() => {
          this.init_selection(this.getDrive_Base())
        }, 1000);
    }
    getDrive_Base(){
      const drive_base = this.drive_base &&  this.drive_base.slice(this.currentPage*per_page, (this.currentPage+1)*per_page)
      return drive_base
      // console.log('drive_base  ',this.currentPage, '=== ',this.pagination.length - 1,' ', this.currentPage === this.pagination.length - 1)
    }
    searchData(e){
      // alert(e.target.value)
      const searchConditions = [
        {
          key: ['address','city','country'],
          value: e.target.value,
          type: SearchType.LK,
        }
      ];
      this.drive_base = filterData(this.results, searchConditions);
      let a: number = Number((this.drive_base.length/per_page))
      //  alert(a)
      this.pagination = new Array(Math.ceil(a));
      // this.drive_base = matchSorter(this.results,'id')
      console.log('drive_base filter ',this.results)
    }

    sort(e){
      this.drive_base = this.drive_base.sort((p1,p2)=> p2[e.target.value] - p1[e.target.value] )
      console.log(this.drive_base)
    }
    selectOrUnselectAll(s, data){
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.selected_data[index].selected = s
        }

      console.log(this.selected_data, ' ', s)
    }
    init_selection(data){
      while (this.selected_data.length > 0) {
        this.selected_data.pop()
      }
      for (const point of data ) {
        const id = point.id.toString()
        this.selected_data.push({ id , selected: false})
        // console.log(this.selected_data, ' ', )

      }
    }
    selectOrUnselect(s,index){
      // if(this.selected_data[index])
      //   return
      console.log(this.selected_data[index])
      this.selected_data[index].selected = s
      console.log(this.selected_data)
    }
    isAllchecked(selected_data?:any[]){
      return this.getAllChecked(selected_data).length === selected_data.length
    }
    isChecked(){

    }
    getAllChecked(selected_data?:any[]){
      let t = []
      for (const d of selected_data) {
        if(d.selected )
          t.push(d)
      }
      // console.log(t)
      return t
    }

  ngOnInit(): void {
  }

  // @ts-ignore
  projectAdded(drive: Drive_Base){
    this.toast_c.open('Be Somewhere', 'Point(s) ajouté (s)')
    if(this.results.filter(r => r.id === drive.id).length === 0)
    this.results.push(drive)
    this.sortByDateDescending(this.results)
    console.log(this.results)
  }

  onDuplicated(e:any){
  }
  
  duplicate(e:Drive_Base){
    this.loading_d = true
    var d = new Drive_Base()
    d = e
    this.routeService.get({drive_id: d.id}).subscribe(routes =>{
      console.log('routeeeeeeees ',routes)
      this.driveBaseService.post(d).subscribe(drive =>{
        routes.forEach((element, index) => {
          element.drive_id = drive.id
          element.point = !Boolean(drive.to_station) ? element.points[1].id  :  element.points[0].id 
          // element.to_station = drive.to_station
          // console.log('routeeeeeeee ',element , ' ', Boolean(drive.to_station) )

          this.routeService.post(element).subscribe(route =>{
            this.loading_d =false
            console.log('routeeeeeeee dupliqué ',routes)

            this.toast_c.open("Be Somewhere ", "Horraire Dupliqué")
            console.log(drive)
            if(index === routes.length - 1)
              this.projectAdded(drive)
          })
        });

      })

    })
    return
    // d.id_car = "No name"

  }
}
