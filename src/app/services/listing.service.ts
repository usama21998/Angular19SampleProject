import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Item } from '../models/item';



@Injectable({
  providedIn: 'root'
})
export class ListingService {


  private urlString: string = "";

  constructor(public restService: RestService) {
  }

  //...................................any.......................................
  public getAllItems = () => {
    this.urlString = `items`;
    return this.restService.get(this.urlString)
  }

  public addItems = (data: Item) => {
    this.urlString = `items`;
    return this.restService.post(this.urlString, data)
  }

  public updateItem = (data: Item) => {
    this.urlString = `items/${data.id}`;
    return this.restService.put(this.urlString, data)
  }

  public deleteItem = (id: number) => {
    this.urlString = `items/${id}`;
    return this.restService.delete(this.urlString)
  }
}
