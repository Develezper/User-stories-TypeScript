export type Property = {
  _id: string;
  name: string;
  value: number;
  img: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PropertyPayload = {
  name: string;
  value: number;
  img?: string;
};