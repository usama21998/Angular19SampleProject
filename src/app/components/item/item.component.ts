import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ListingService } from '../../services/listing.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../models/item';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { title } from 'process';
import { NotificationService } from '../../services/toastr.service';
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
    selectedItemId: any = null;
    public myForm: FormGroup<any>;

    isEditing: boolean = false;

    constructor(private service: ListingService, private fb: FormBuilder, private notification: NotificationService) {
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
            res = res.sort((a: any, b: any) => b.id - a.id);
            this.dataSource.data = res;
        }, (error) => {
            this.notification.showError('Something went wrong, Please try again later');
        });
    }

    performAction(action: string, item: any) {
        if (action === 'delete') {
            this.service.deleteItem(item.id).subscribe((res: any) => {
                this.notification.showSuccess('Item deleted successfully');
                this.dataSource.data = this.dataSource.data.filter(a => a.id !== res.id);
            }, (error) => {
                this.notification.showError('Something went wrong, Please try again later');
            });
        }
        else if (action === 'edit') {
            this.isEditing = true;
            this.myForm.patchValue(item);
            this.selectedItemId = item.id;
        }
    }

    onSubmit(isValid: boolean, value: any) {
        if (!isValid) {
            this.myForm.markAllAsTouched();
            return;
        }
        if (this.isEditing) {
            let data = value;
            data.id = this.selectedItemId;
            this.service.updateItem(data).subscribe((res: any) => {
                this.notification.showSuccess('Item updated successfully');
                this.getItems();
                this.onClear();
            }, (error) => {
                this.notification.showError('Something went wrong, Please try again later');
            });
        }
        else {
            this.service.addItems(value).subscribe((res: any) => {
                this.dataSource.data = [res, ...this.dataSource.data];
                this.notification.showSuccess('Item added successfully');
                this.onClear();
            }, (error) => {
                this.notification.showError('Something went wrong, Please try again later');
            });
        }

    }

    onClear() {
        this.myForm.reset();
        this.isEditing = false;
        this.selectedItemId = null;
    }

    formTouchedDirtyRequired(form: any, formField: string) {
        if (form.get(formField).invalid && (form.get(formField).dirty || form.get(formField).touched))
            return true
        else
            return false;
    }
}
