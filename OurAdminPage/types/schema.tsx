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
    id: string;
    description: string;
    image: string;
    name: string;
    price: number;
}

export interface Dish {
    name: string;
    items: Item[];
}

export interface Catalog {
    id: string;
    dishes: Dish[];
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}

export interface OwnerContact {
  Address: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
}

export interface Restaurant {
  Id: string;
  Address: string;
  CuisineType: string;
  Description: string;
  Email: string;
  Name: string;
  PhoneNumber: string;
  OwnerContact: OwnerContact;

  // Optional: Diese Felder nur hinzufügen, wenn sie benötigt werden
  _rid?: string;
  _self?: string;
  _etag?: string;
  _attachments?: string;
  _ts?: number;
}
  