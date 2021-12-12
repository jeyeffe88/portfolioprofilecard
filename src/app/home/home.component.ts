import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { AppUtils } from '../utils/appUtils/appUtils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('name') nameDiv!: ElementRef;

  public avatarSrc:any=""; 
  public profileCardInfo:any=null;
  public subTitle:string="";
  public title:string="";

  constructor(
    public homeService:HttpService,
    public elementRef: ElementRef
  ) { }

  ngOnInit(): void {   

    //call to retrieve data
    this.homeService.sendGetRequest("https://randomuser.me/api").subscribe((res:any) => {   
        //check if result is populate    
        if(res != null && res.results.length){
          this.profileCardInfo = res.results[0];  
          this.initializeProfileCard();  
        }else{
          this.title ="No element found";
        }
    });
  }

  //method to initialize page
  initializeProfileCard() {   
    this.setFaviconGender();    
    this.setAvatar();
    this.setInitialInfo();    
  }
 
  //method to set image profile
  setAvatar() { 
    this.avatarSrc = this.profileCardInfo.picture.large;
  }

  //method to set favicon 
  setFaviconGender() { 
    if(this.profileCardInfo.gender == "female"){    
      let favicon:any = document.getElementById("favicon");
      favicon.setAttribute("href", "assets/images/femaleUser.svg"); 
    }
  }

  //method to set first div as hover element
  setInitialInfo() {
    this.subTitle = "Hi, My name is";
    this.title = this.profileCardInfo.name.first + " " + this.profileCardInfo.name.last;
    this.nameDiv.nativeElement.className = "customDiv customDivHover";   
  }
  
  //method to change element hover and relative info
  changeDetailInfo(event:any) {  
    this.setClassElementDiv(event); 
    this.setTitle(event); 
    this.setSubtitle(event); 
  }

  //method to set class element
  setClassElementDiv(event: any) {
    const dom: HTMLElement = this.elementRef.nativeElement;
    const elements = dom.querySelectorAll('.customDiv');
    elements.forEach(item => {     
      if(item.id == event.currentTarget.id){
        item.className = "customDiv customDivHover";
      }else{
        item.className = "customDiv"; 
      }
    });    
  }

  //method to set subtitle value
  setSubtitle(event: any) {    
    this.subTitle = "My " +   AppUtils.replaceUnderscore(event.currentTarget.id) + " is";
    if(event.currentTarget.id == "name"){
      this.subTitle = "Hi, " + this.subTitle;
    }
  }

  //method to set title value
  setTitle(event: any) {    
    this.title = this.getTitleById(event.currentTarget.id);   
  }

  //method to retrieve title value
  getTitleById(id: any) {
    let res:any = "";
    switch(id) { 
      case 'name': { 
        res = this.profileCardInfo.name.first + " " + this.profileCardInfo.name.last;
        break;
      } 
      case 'email_address': { 
        res = this.profileCardInfo.email;
        break;
      } 
      case 'birthday': { 
        res = AppUtils.formatDate(this.profileCardInfo.dob.date, 'DD/MM/YYYY');
        break;
      } 
      case 'address': { 
        res = this.profileCardInfo.location.street.number + " " + this.profileCardInfo.location.street.name;
        break;
      } 
      case 'phone_number': { 
        res = this.profileCardInfo.phone;
        break;
      } 
      case 'password': { 
        res = this.profileCardInfo.login.password;
        break;
      }  
    } 
    return res; 
  } 


}