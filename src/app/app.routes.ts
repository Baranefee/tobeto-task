import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/components/category-list/category-list.component';
import { CategoryUpdateComponent } from './features/categories/components/category-update/category-update.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { ProductUpdateComponent } from './features/products/components/product-update/product-update.component';

export const routes: Routes = [
    {
        path:'categories',
        component: CategoryListComponent,
        title:'categories'
    },
    {
        path:'categories/update/:id',
        component: CategoryUpdateComponent,
        title:'categories-detail'
    },
    {
        path:'products',
        component: ProductListComponent,
        title:'products'
    },
    {
        path:'products/update/:id',
        component: ProductUpdateComponent,
        title:'products-detail'
    }
];
