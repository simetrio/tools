import { AllRoutes } from "./Routes"

export const Main: React.FC = () => {
    return (
        <>
            <div>Main</div>
            {AllRoutes.map(x => (
                <div>
                    <a href={`/tools/${x.url}`}>{x.name}</a>
                </div>
            ))}
        </>
    )
}