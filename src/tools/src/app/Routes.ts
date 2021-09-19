export interface Route {
    url: string,
    name: string,
}

export const GuidGeneratorRoute: Route = { 
    url: "guid-generator", 
    name: "Online guid generator", 
}

export const AllRoutes: Route[] = [
    GuidGeneratorRoute,
]