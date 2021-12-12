
import * as moment from 'moment';

export class AppUtils{


  //method to change date to desired format 
  static formatDate(dateParam: any, formatParam: string): any {
    let date = moment(dateParam);
    return date.format(formatParam);
  }

  //method to replace underscore with blank space 
  static replaceUnderscore(str: any) {
    return str.replace("_", " "); 
  }
}