import { model, models, Schema, type InferSchemaType } from "mongoose";

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type PropertyDocument = InferSchemaType<typeof propertySchema> & {
  _id: string;
};

const Property = models.Property || model("Property", propertySchema);

export default Property;