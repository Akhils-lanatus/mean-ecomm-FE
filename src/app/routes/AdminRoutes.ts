import { Routes } from "@angular/router"
import { CategoryHomeComponent } from "../admin/categories/home/home.component"
import { CategoryAddComponent } from "../admin/categories/add/add.component"
import { CategoryUpdateComponent } from "../admin/categories/update/update.component"
import { AdminComponent } from "../admin/admin.component"
import { BrandHomeComponent } from "../admin/brand/home/home.component"
import { BrandAddComponent } from "../admin/brand/add/brand-add.component"
import { BrandUpdateComponent } from "../admin/brand/update/update.component"

export const AdminRoutes: Routes = [
    {
        path: "",
        title: 'Admin',
        component: AdminComponent
    },
    {
        path: "category",
        children: [
            {
                path: "",
                title: "Admin Category - Home",
                component: CategoryHomeComponent
            },
            {
                path: "add",
                title: "Admin Category - Add",
                component: CategoryAddComponent
            },
            {
                path: "update/:id",
                title: "Admin Category - Update",
                component: CategoryUpdateComponent
            }
        ]
    },
    {
        path: "brand",
        children: [
            {
                path: "",
                title: "Admin Brand - Home",
                component: BrandHomeComponent
            },
            {
                path: "add",
                title: "Admin Brand - Add",
                component: BrandAddComponent
            },
            {
                path: "update/:id",
                title: "Admin Brand - Update",
                component: BrandUpdateComponent
            }
        ]
    },


]