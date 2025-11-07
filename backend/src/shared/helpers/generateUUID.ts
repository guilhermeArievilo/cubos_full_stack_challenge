import { ObjectId } from "bson";

export default function generateId(): string {
  return new ObjectId().toHexString();
}