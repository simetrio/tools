export const JsonFormatterUtils = {
    format: (value: string, formatValue: (value: string | number | boolean | null) => string): string =>
        formatJson(value, formatValue),
};

function formatJson(value: string, formatValue: (value: string | number | boolean | null) => string) {
    if (!value) {
        return "";
    }

    try {
        return JSON.stringify(parseJson(value), null, 4)
            .replace(/": [\d.]+[,\n]/g, (x) => formatNumber(x, formatValue))
            .replace(/": ".+\n/g, (x) => formatString(x, formatValue))
            .replace(/": true/g, (x) => formatBoolean(x, formatValue))
            .replace(/": false/g, (x) => formatBoolean(x, formatValue))
            .replace(/": null/g, (x) => formatNull(x, formatValue));
    } catch (e: any) {
        return (e as Error).message;
    }
}

function parseJson(value: string): any {
    return JSON.parse(value.replace(/\n/g, ""));
}

function formatNumber(value: string, formatValue: (value: number) => string): string {
    return value.replace(/[\d.]+/, (x) => formatValue(parseFloat(x)));
}

function formatString(value: string, formatValue: (value: string) => string): string {
    return value.replace(/ ".+"/, formatValue);
}

function formatBoolean(value: string, formatValue: (value: boolean) => string): string {
    return value.replace(/true/, (_) => formatValue(true)).replace(/false/, (_) => formatValue(false));
}

function formatNull(value: string, formatValue: (value: any) => string): string {
    return value.replace(/null/, (_) => formatValue(null));
}
