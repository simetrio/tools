export const JsonViewerUtils = {
    parse: (value: string): JsonObject | null => parseJsonObject(value),
}

export type JsonValueType = "null" | "value" | "array" | "object";

interface JsonValue {
  value: any,
  type: JsonValueType,
  expanded: boolean,
}

interface JsonProperty {
  name: string,
  value: JsonValue,
}

export interface JsonObject {
  values: JsonProperty[],
}

function parseJsonObject(value: string): JsonObject | null {
  if (!value) {
    return null;
  }

  try {
    return getObject(parseJson(value));
  } catch(e: any) {
    return null;
  }
}

function parseJson(value: string): any {
  return JSON.parse(value.replace(/\n/g, ""));
}

function getObject(value: any): JsonObject {
  return {
    values: getProperties(value),
  }
}

function getProperties(value: any): JsonProperty[] {
  return Object.keys(value).map(key => ({
    name: key,
    value: getValue(value[key]),
  }))
}

function getValue(value: any): JsonValue {
  if (value === null) {
    return jsonValue(null, "null");
  }
  if (Array.isArray(value)) {
    return jsonValue((value as []).map(getValue), "array");
  }
  const type = typeof value;
  if (type === "string" || type === "number" || type === "bigint" || type === "boolean") {
    return jsonValue(value, "value");
  }
  return jsonValue(getObject(value), "object");
}

function jsonValue(value: any, type: JsonValueType): JsonValue {
  return {
    value,
    type,
    expanded: false,
  }
}