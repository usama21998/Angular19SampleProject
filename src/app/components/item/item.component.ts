import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ListingService } from '../../services/listing.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrl: './item.component.css',
    standalone: true,
    imports: [MatTableModule, MatIconModule]
})
export class ItemComponent {
    displayedColumns: string[] = ['title', 'description', 'actions'];
    dataSource: MatTableDataSource<any>
    itemList = [
        {
            title: "Item 1",
            description: "Description of Item 1"
        },
        {
            title: "Item 2",
            description: "Description of Item 2"
        },
        {
            title: "Item 3",
            description: "Description of Item 3"
        }
    ]

    constructor() {
        this.dataSource = new MatTableDataSource<any>();
        this.dataSource.data = this.itemList;
    }

    performAction(action: string, item: any) {
        debugger
        console.log('Action:', action, 'Item:', item);
    }
}
