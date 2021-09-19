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

export const AllRoutes: Route[] = [
    GuidGeneratorRoute,
    UrlEncodeDecodeRoute,
    HtmlEncodeDecodeRoute,
]