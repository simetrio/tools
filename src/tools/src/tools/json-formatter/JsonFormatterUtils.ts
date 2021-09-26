export const JsonFormatterUtils = {
    format: (value: string, formatValue: (value: string | number) => string): string => formatJson(value, formatValue),
}

function formatJson(value: string, formatValue: (value: string | number) => string) {
  if(!value) {
    return "";
  }

  try {
    return JSON.stringify(
      JSON.parse(value), 
      (_, v) => format(v, formatValue), 
      4
    );
  } catch(e: any) {
    return (e as Error).message;
  }
}

function format(value: any, formatValue: (value: string | number) => string) {
  return typeof value === "string" || typeof value === "number"
    ? formatValue(value)
    : value;
}

