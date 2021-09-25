export interface Route {
    url: string,
    name: string,
}

export const TranslitFromRussianToEnglishRoute: Route = { 
    url: "translit-from-russian-to-english", 
    name: "Translit From Russian", 
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
    name: "Base64 Encode/Decode", 
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
    TranslitFromRussianToEnglishRoute,
    GuidGeneratorRoute,
    UrlEncodeDecodeRoute,
    HtmlEncodeDecodeRoute,
    Base64EncodeDecodeRoute,
    Md5GeneratorRoute,
    Sha1GeneratorRoute,
    Sha256GeneratorRoute,
]