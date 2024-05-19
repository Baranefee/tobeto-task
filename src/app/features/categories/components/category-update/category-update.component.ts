import { Component ,Input} from '@angular/core';
import { CategoryListItem } from '../../models/category-list-item';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './category-update.component.html',
  styleUrl: './category-update.component.scss'
})
export class CategoryUpdateComponent {

  category!:CategoryListItem
  categoryForm!: FormGroup; // FormGroup tanımlayın
  categoryId:number =0;
  constructor(private categoriesService: CategoriesService,  private formBuilder: FormBuilder ,private router:Router ,private route:ActivatedRoute) { }



  ngOnInit(): void {
    // Form oluşturucuyu kullanarak form grubu oluşturun
    this.categoryForm = this.formBuilder.group({
      
      name: ['', Validators.required], // Name alanı zorunlu olsun
      description: ['', Validators.required] // Description alanı zorunlu olsun
    });
    
    // getCategoryDetails metodu içinde kategori bilgilerini form alanlarına doldurun
    this.getCategoryDetails();
 
    
  }

  

  getCategoryDetails(): void {
    this.categoryId = +(this.route.snapshot.paramMap.get('id') || 0);

    
    this.categoriesService.getCategoryById(this.categoryId)
      .subscribe(category => {
        
        // Form değerlerini kategori detaylarıyla doldurun
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description,});
      });
  }


  updateCategory(): void {
    // Form değerlerini alın
    const updatedCategory = this.categoryForm.value;
    
    this.categoriesService.updateCategory(updatedCategory,this.categoryId)
      .subscribe(() => {
        this.router.navigate(['/categories']);
        console.log('Kategori güncellendi!');
      });
  }
}
