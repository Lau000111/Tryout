
interface Item {
    id: string;
    description: string;
    image: string;
    name: string;
    price: number;
}

interface Dish {
    name: string;
    items: Item[];
}

interface Catalog {
    id: string;
    dishes: Dish[];
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}

interface ExtendedItem extends Item {
  quantity: number;
}