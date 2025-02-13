import { Injectable } from '@angular/core';


import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class ListingService {


  private urlString: string = "";

  constructor(public restService: RestService) {
  }

  //...................................any.......................................
  public getAllUsers = () => {
    this.urlString = `admin/user`;
    return this.restService.get(this.urlString)
  }

  public addUser = (data: any) => {
    this.urlString = `admin/user`;
    return this.restService.post(this.urlString, data)
  }

  public updateUser = (data: any) => {
    this.urlString = `admin/user`;
    return this.restService.put(this.urlString, data)
  }

  public deleteUser = (branchId: number) => {
    this.urlString = `admin/user/${branchId}`;
    return this.restService.delete(this.urlString)
  }
}
