export interface CategoryHierarchy {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    children: CategoryHierarchy[];
}