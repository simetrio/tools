import { AllRoutes } from "./Routes"

export const Header: React.FC = () => {
    return (
        <>
            <div>Header</div>
            {AllRoutes.map(x => (
                <><a href={`/tools/${x.url}`}>{x.name}</a> | </>
            ))}
        </>
    )
}