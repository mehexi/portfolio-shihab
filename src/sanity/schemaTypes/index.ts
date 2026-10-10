import type { SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { profile } from "./profile";

export const schemaTypes: SchemaTypeDefinition[] = [profile, article];
