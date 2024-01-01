import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent {

  @Input() time
  constructor(){
    const self = this; // Stocke la référence à this

    window.addEventListener('load', function() {
      if(!self.time)
        //@ts-ignore
        document.getElementById('preloader').style.display = 'none';
    });
    setTimeout(() => {
      //@ts-ignore
      document.getElementById('preloader').style.display = 'none';
    }, this.time);
  }
}
