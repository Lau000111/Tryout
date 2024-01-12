interface MenuItem {
    id: number;
    title: string;
    description: string;
    price: number;
  }
  
  interface MenuData {
    [category: string]: MenuItem[];
  }
  