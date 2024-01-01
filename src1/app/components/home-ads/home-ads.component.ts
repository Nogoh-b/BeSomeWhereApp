import { AdsService } from './../../service/ads/ads.service';
import { Component, Input, OnInit } from '@angular/core';
import { Ads } from 'src/app/model/Model/Ads';

@Component({
  selector: 'app-home-ads',
  templateUrl: './home-ads.component.html',
  styleUrls: ['./home-ads.component.css']
})
export class HomeAdsComponent implements OnInit {

  constructor(private adsService: AdsService) { }

  @Input() title = '';
  @Input() description = '';
  @Input() image= '';
  @Input() url= '';
  ads: Ads
  ngOnInit(): void {
    this.adsService.get().subscribe(a =>{
      this.ads = a[ this.getRandomInt(0,a.length - 1)]
    })

  }
  getRandomInt(min, max) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  openInNewTab(){
    window.open('http://'+this.ads.link, '_blank');
  }
}
