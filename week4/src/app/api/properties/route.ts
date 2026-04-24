import Property from "@/database/models/Property";
import { connectToDatabase, isDatabaseUnavailableError } from "@/lib/db";

export const runtime = "nodejs";

type PropertyRecord = {
  _id: string | { toString(): string };
  name: string;
  value: number;
  img?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

function serializeProperty(property: PropertyRecord) {
  return {
    _id: property._id.toString(),
    name: property.name,
    value: property.value,
    img: property.img ?? "",
    createdAt: property.createdAt?.toISOString(),
    updatedAt: property.updatedAt?.toISOString(),
  };
}

export async function GET() {
  try {
    await connectToDatabase();
    const properties = await Property.find().sort({ createdAt: -1 }).lean();

    return Response.json(properties.map((property) => serializeProperty(property as PropertyRecord)));
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      return Response.json(
        {
          message:
            "MongoDB no esta disponible. Inicia tu servidor de base de datos o actualiza MONGODB_URI.",
        },
        { status: 503 }
      );
    }

    console.error("Error listing properties", error);

    return Response.json(
      { message: "No se pudieron obtener las propiedades." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: unknown;
      value?: unknown;
      img?: unknown;
    };

    const name = typeof payload.name === "string" ? payload.name.trim() : "";
    const value = typeof payload.value === "number" ? payload.value : Number.NaN;
    const img = typeof payload.img === "string" ? payload.img.trim() : "";

    if (!name || !Number.isFinite(value) || value < 0) {
      return Response.json(
        { message: "Los campos name y value son obligatorios y deben ser válidos." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const createdProperty = await Property.create({ name, value, img });

    return Response.json(serializeProperty(createdProperty.toObject() as PropertyRecord), {
      status: 201,
    });
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      return Response.json(
        {
          message:
            "MongoDB no esta disponible. Inicia tu servidor de base de datos o actualiza MONGODB_URI.",
        },
        { status: 503 }
      );
    }

    console.error("Error creating property", error);

    return Response.json(
      { message: "No se pudo crear la propiedad." },
      { status: 500 }
    );
  }
}