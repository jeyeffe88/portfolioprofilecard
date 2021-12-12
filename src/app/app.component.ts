import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppUtils } from './utils/appUtils/appUtils';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public objLoaderStatus: boolean = true;
  public isSupported: boolean = true;

  constructor(
    public router: Router, 
    private cdref: ChangeDetectorRef
  ){}

  ngOnInit(){ 
    this.checkBrowserCompatibility();
    this.router.navigateByUrl("/home", { skipLocationChange: true });
  }

  ngAfterContentChecked(){ 
    this.cdref.detectChanges();
  }

  //method to check browser
  private checkBrowserCompatibility(){
    let browser:any = this.getBrowser();
    switch(browser.name){
      case 'IE':
        this.isSupported = false;
        break;
      case 'Edge':
        this.isSupported = browser.version > 11;
        break;
      case 'Chrome':
        this.isSupported = browser.version > 55;
        break;
      case 'Firefox':
        this.isSupported = browser.version > 55;
        break;
      case 'Safari':
        this.isSupported = browser.version > 10;
        break;
      case 'Opera':
        this.isSupported = browser.version > 44;
        break;
      default:
        this.isSupported = false;
        break;
    }
  }

  //method to get browser info
  private getBrowser() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
      if ((tem = ua.match(/\b(OPR|Opera)\/(\d+)/)) != null) {
        return { name: 'Opera', version: tem[2] };
      } else if ((tem = ua.match(/\bEdge\/(\d+)/)) != null) {
        return { name: 'Edge', version: tem[1] };
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null)
      M.splice(1, 1, tem[1]);

    return {
      name: M[0],
      version: M[1]
    };
  }

}
