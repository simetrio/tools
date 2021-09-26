export const JsonFormatterUtils = {
    format: (value: string): string => {
      if(!value) {
        return "";
      }
      
      try {
        return JSON.stringify(JSON.parse(value), null, 4);
      } catch(e: any) {
        return (e as Error).message;
      }
    },
}