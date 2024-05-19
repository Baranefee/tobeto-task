import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { ProductListItem } from '../../models/product-list-item';
import { ProductsService } from '../../services/products.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent {
  product!:ProductListItem
  productForm!: FormGroup; // FormGroup tanımlayın
  productId:number =0;
  constructor(private productsService: ProductsService,  private formBuilder: FormBuilder ,private router:Router ,private route:ActivatedRoute) { }



  ngOnInit(): void {
    // Form oluşturucuyu kullanarak form grubu oluşturun
    this.productForm = this.formBuilder.group({
      
      // id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      supplierId: ['', Validators.required],
      categoryId: ['', Validators.required],
      quantityPerUnit: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      unitsOnOrder: ['', Validators.required],
      reorderLevel: ['', Validators.required],
      discontinued: [false, Validators.required]
    });
    
    
    this.getProductDetails();
 
    
  }

  

  getProductDetails(): void {
    this.productId = +(this.route.snapshot.paramMap.get('id') || 0);

    
    this.productsService.getProductById(this.productId)
      .subscribe(product => {
        
        // Form değerlerini kategori detaylarıyla doldurun
        this.productForm.patchValue({
          name: product.name,
          supplierId:product.supplierId,
          categoryId:product.categoryId,
          quantityPerUnit:product.quantityPerUnit,
          unitPrice:product.unitPrice,
          unitsInStock:product.unitsInStock,
          unitsOnOrder:product.unitsOnOrder,
          reorderLevel:product.reorderLevel,
          discontinued: product.discontinued,});
      });
  }


  updateProduct(): void {
    // Form değerlerini alın
    const updatedCategory = this.productForm.value;
    
    this.productsService.updateProduct(updatedCategory,this.productId)
      .subscribe(() => {
        this.router.navigate(['/products']);
        console.log('urun güncellendi!');
      });
  }
}
