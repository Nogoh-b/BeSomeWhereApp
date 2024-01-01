import { UserServiceFireBase } from 'src/app/service/core/user.service';
import { User } from 'src/app/model/Model/Utilisateur';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  user: User
  constructor(private userServiceFireBase: UserServiceFireBase) { }

  ngOnInit(): void {
    this.user = this.userServiceFireBase.getCurrentUser()
  }

  is_saved(){
    return this.user && this.user.joined  //this.user.lattitude !== null && this.user.longitude != null && this.user.country != null
  }


}
