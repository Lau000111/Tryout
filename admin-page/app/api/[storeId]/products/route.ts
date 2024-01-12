import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();

    // Überprüfe, ob alle erforderlichen Felder vorhanden sind
    const { name, price, categoryId, colorId, sizeId, images } = body;

    if (!name || !price || !categoryId || !colorId || !sizeId || !images) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    // Bereite die Daten für den API-Request vor
    const apiRequestBody = {
      // Strukturiere deinen Request-Body hier
    };

    // Sende den Request an den API-Endpoint
    const response = await fetch('http://localhost:5235/api/catalog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiRequestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}


// export async function GET(
//   req: Request,
//   { params }: { params: { storeId: string } },
// ) {
//   try {
//     const { searchParams } = new URL(req.url)
//     const categoryId = searchParams.get('categoryId') || undefined;
//     const colorId = searchParams.get('colorId') || undefined;
//     const sizeId = searchParams.get('sizeId') || undefined;
//     const isFeatured = searchParams.get('isFeatured');

//     if (!params.storeId) {
//       return new NextResponse("Store id is required", { status: 400 });
//     }

//     const products = await prismadb.product.findMany({
//       where: {
//         storeId: params.storeId,
//         categoryId,
//         colorId,
//         sizeId,
//         isFeatured: isFeatured ? true : undefined,
//         isArchived: false,
//       },
//       include: {
//         images: true,
//         category: true,
//         color: true,
//         size: true,
//       },
//       orderBy: {
//         createdAt: 'desc',
//       }
//     });
  
//     return NextResponse.json(products);
//   } catch (error) {
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };
