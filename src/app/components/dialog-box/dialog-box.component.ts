import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProducts } from 'src/app/models/products';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProducts,
  ) { if (this.data) this.isNew = false }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    image: new FormControl(this.data?.image ?? ''),
    description: new FormControl(this.data?.description ?? ''),

  })

  isNew: boolean = true

  onNoClick(): void {
    this.dialogRef.close(null)
  }
  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      image: this.myForm.value.image,
      description: this.myForm.value.description
    }
    this.dialogRef.close(this.data);
  }
}
