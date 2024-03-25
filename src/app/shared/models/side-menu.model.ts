export interface MenuItem {
    title: string;
    path?: string;
    children?: MenuItem[];
    disable?: boolean;
}