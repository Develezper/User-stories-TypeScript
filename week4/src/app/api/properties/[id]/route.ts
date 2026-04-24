import { Types } from "mongoose";

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

function isValidObjectId(id: string) {
  return Types.ObjectId.isValid(id);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return Response.json({ message: "El id de la propiedad no es válido." }, { status: 400 });
  }

  try {
    const payload = (await request.json()) as {
      name?: unknown;
      value?: unknown;
      img?: unknown;
    };

    const updates: Record<string, string | number> = {};

    if (typeof payload.name === "string" && payload.name.trim()) {
      updates.name = payload.name.trim();
    }

    if (typeof payload.value === "number" && Number.isFinite(payload.value) && payload.value >= 0) {
      updates.value = payload.value;
    }

    if (typeof payload.img === "string") {
      updates.img = payload.img.trim();
    }

    if (Object.keys(updates).length === 0) {
      return Response.json(
        { message: "Debes enviar al menos un campo válido para actualizar." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updatedProperty = await Property.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
      runValidators: true,
    }).lean();

    if (!updatedProperty) {
      return Response.json({ message: "Propiedad no encontrada." }, { status: 404 });
    }

    return Response.json(serializeProperty(updatedProperty as PropertyRecord));
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

    console.error("Error updating property", error);

    return Response.json(
      { message: "No se pudo actualizar la propiedad." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return Response.json({ message: "El id de la propiedad no es válido." }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const deletedProperty = await Property.findByIdAndDelete(id).lean();

    if (!deletedProperty) {
      return Response.json({ message: "Propiedad no encontrada." }, { status: 404 });
    }

    return Response.json(serializeProperty(deletedProperty as PropertyRecord));
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

    console.error("Error deleting property", error);

    return Response.json(
      { message: "No se pudo eliminar la propiedad." },
      { status: 500 }
    );
  }
}