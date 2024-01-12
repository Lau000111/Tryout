export interface Store {
    id: string;
    name: string;
    userId: string;
    billboards: Billboard[];
    categories: Category[];
    products: Product[];
    sizes: Size[];
    colors: Color[];
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Billboard {
    id: string;
    storeId: string;
    store: Store;
    label: string;
    imageUrl: string;
    categories: Category[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Category {
    id: string;
    storeId: string;
    // store: Store;
    // billboardId: string;
    // billboard: Billboard;
    name: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Product {
    id: string;
    storeId: string;
    name: string;
    price: number; // Annahme: Decimal wird als number behandelt
    isFeatured: boolean;
    isArchived: boolean;
    sizeId: string;
    size: Size;
    colorId: string;
    color: Color;
    images: Image[];
    orderItems: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Order {
    id: string;
    storeId: string;
    // store: Store;
    orderItems: OrderItem[];
    isPaid: boolean;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface OrderItem {
    id: string;
    orderId: string;
    order: Order;
    productId: string;
    product: Product;
  }
  
  export interface Size {
    id: string;
    storeId: string;
    // store: Store;
    name: string;
    value: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Color {
    id: string;
    storeId: string;
    // store: Store;
    name: string;
    value: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Image {
    id: string;
    productId: string;
    product: Product;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Item {
    Id: string;
    Description: string;
    Image: string;
    Name: string;
    Price: number;
}

export interface Dish {
    Name: string;
    Items: Item[];
}

export interface Catalog {
    Id: string;
    id: string; // Sie haben zwei verschiedene 'id'-Felder. Stellen Sie sicher, dass dies beabsichtigt ist.
    Dishes: Dish[];
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}

  