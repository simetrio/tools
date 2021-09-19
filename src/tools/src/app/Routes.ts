export interface Route {
    url: string,
    name: string,
}

export const GuidGeneratorRoute: Route = { 
    url: "guid-generator", 
    name: "Guid Generator", 
}

export const UrlEncoderRoute: Route = { 
    url: "url-encode-decode", 
    name: "Url Encode/Decode", 
}

export const AllRoutes: Route[] = [
    GuidGeneratorRoute,
    UrlEncoderRoute,
]