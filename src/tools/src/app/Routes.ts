export interface Route {
    url: string,
    name: string,
}

export const JsonViewerRoute: Route = { 
    url: "json-viewer", 
    name: "Json Viewer", 
}

export const JsonFormatterRoute: Route = { 
    url: "json-formatter", 
    name: "Json Formatter", 
}

export const TextDifferencesRoute: Route = { 
    url: "text-differences", 
    name: "Differences Between Texts", 
}

export const TranslitFromRussianToEnglishRoute: Route = { 
    url: "translit-from-russian-to-english", 
    name: "Translit From Russian", 
}

export const UnitConverterRoute: Route = { 
    url: "unit-converter", 
    name: "Unit Converter", 
}

export const LoanCalculatorRoute: Route = { 
    url: "loan-calculator", 
    name: "Loan Calculator", 
}

export const GuidGeneratorRoute: Route = { 
    url: "guid-generator", 
    name: "Guid Generator", 
}

export const UrlEncodeDecodeRoute: Route = { 
    url: "url-encode-decode", 
    name: "Url Encode/Decode", 
}

export const HtmlEncodeDecodeRoute: Route = { 
    url: "html-encode-decode", 
    name: "Html Encode/Decode", 
}

export const Base64EncodeDecodeRoute: Route = { 
    url: "base64-encode-decode", 
    name: "Base64 Encode/Decode Text", 
}

export const Base64EncodeFileOrImageRoute: Route = { 
    url: "base64-encode-file-or-image", 
    name: "Base64 Encode File Or Image", 
}

export const Md5GeneratorRoute: Route = { 
    url: "md5-generator", 
    name: "MD5 Generator", 
}

export const Sha1GeneratorRoute: Route = { 
    url: "sha1-generator", 
    name: "SHA1 Generator", 
}

export const Sha256GeneratorRoute: Route = { 
    url: "sha256-generator", 
    name: "SHA256 Generator", 
}

export const AllRoutes: Route[] = [
    JsonViewerRoute,
    JsonFormatterRoute,
    TextDifferencesRoute,
    TranslitFromRussianToEnglishRoute,
    UnitConverterRoute,
    LoanCalculatorRoute,
    GuidGeneratorRoute,
    UrlEncodeDecodeRoute,
    HtmlEncodeDecodeRoute,
    Base64EncodeDecodeRoute,
    Base64EncodeFileOrImageRoute,
    Md5GeneratorRoute,
    Sha1GeneratorRoute,
    Sha256GeneratorRoute,
]