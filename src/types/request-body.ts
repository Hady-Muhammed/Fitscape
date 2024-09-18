import { Row } from "./row";

export interface RequestBody {
  [key: string]:
    | string
    | number
    | Date
    | undefined
    | Row
    | object
    | null
    | boolean;
}
