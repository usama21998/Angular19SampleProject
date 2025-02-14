import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ListingService } from '../../services/listing.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../models/item';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrl: './item.component.css',
    standalone: true,
    imports: [MatTableModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
    displayedColumns: string[] = ['title', 'description', 'actions'];
    dataSource: MatTableDataSource<any>
    itemList = [
        // {
        //     title: "Item 1",
        //     description: "Description of Item 1"
        // },
        // {
        //     title: "Item 2",
        //     description: "Description of Item 2"
        // },
        // {
        //     title: "Item 3",
        //     description: "Description of Item 3"
        // }
    ]

    public myForm: FormGroup<any>;

    isEditing: boolean = false;
    constructor(private service: ListingService, private fb: FormBuilder) {
        this.dataSource = new MatTableDataSource<any>();
        this.dataSource.data = this.itemList;

        this.myForm = this.fb.group({
            title: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
        });
    }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.service.getAllItems().subscribe((res: any) => {
            this.dataSource.data = res;
        });
    }

    performAction(action: string, item: any) {
        debugger
        console.log('Action:', action, 'Item:', item);

        if (action === 'delete') {
            this.service.deleteItem(item.id).subscribe((res: any) => {
                this.dataSource.data = this.dataSource.data.filter(a => a.id !== res.id);
                // this.getItems();
            });
        }
        else if (action === 'edit') {
            this.isEditing = true;
            this.myForm.patchValue(item);
        }
    }

    onSubmit(isValid: boolean, value: any) {
        debugger
        if (!isValid) {
            return;
        }
        this.service.updateItem(value).subscribe((res: any) => {
            this.getItems();
        });
    }

    onClear() {
        this.myForm.reset();
        this.isEditing = false;
    }

    formTouchedDirtyRequired(form: any, formField: string) {
        if (form.get(formField).invalid && (form.get(formField).dirty || form.get(formField).touched))
            return true
        else
            return false;
    }
}
