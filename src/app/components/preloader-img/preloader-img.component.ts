import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader-img',
  templateUrl: './preloader-img.component.html',
  styleUrls: ['./preloader-img.component.scss']
})
export class PreloaderImgComponent implements OnInit {

  @Input() src = ''
  @Input() height_ = 'auto'
  @Input() width_ = '100%'
  @Input() class: string[] = [] 
  @Input() objectFit = 'cover'
  /*onImageLoad() {
    var preloader = document.querySelector('.preloader') as HTMLElement;
    preloader.style.display = 'none';
    
    var image = document.querySelector('.image') as HTMLElement;
    image.style.display = 'block';
  }*/
  ngOnInit(): void {
    this.imageSrc = this.src
    // var image = document.querySelector('.image') as HTMLElement;
    // image.style.height = this.height_ ;
    // image.style.objectFit = this.objectFit;
  }

  @Input() imageSrc = 'https://example.com/image.jpg';
  isLoading = true;
  
  get preloaderStyle() {
    return {
      position: 'relative',
      display: this.isLoading ? 'block' : 'none',
      width: this.width_,
      height: this.height_,
      paddingBottom: '56.25%' // Aspect ratio of 16:9
    };
  }
  
  get imageStyle() {
    return {
      display: !this.isLoading ? 'block' : 'none',
      width: this.width_,
      objectFit: this.objectFit,
      height: this.height_,
    };
  }
  
  onImageLoad() {
    this.isLoading = false;
  }
}
