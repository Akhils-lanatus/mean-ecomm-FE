import { Routes } from "@angular/router";
export const AppRoutes: Routes = [
    {
        path: "",
        redirectTo: "admin",
        pathMatch: "full"
    },
    { path: "admin", loadChildren: () => import("./AdminRoutes").then(m => m.AdminRoutes) },
];