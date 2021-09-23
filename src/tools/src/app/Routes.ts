export interface Route {
    url: string,
    name: string,
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

export const Sha256GeneratorRoute: Route = { 
    url: "sha256-generator", 
    name: "SHA256 Generator", 
}

export const AllRoutes: Route[] = [
    GuidGeneratorRoute,
    UrlEncodeDecodeRoute,
    HtmlEncodeDecodeRoute,
    Base64EncodeDecodeRoute,
    Sha256GeneratorRoute,
]