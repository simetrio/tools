import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { Main } from "./Main";
import { GuidGeneratorRoute } from "./Routes";
import { GuidGenerator } from "../tools/guid-generator/GuidGenerator";

export const Router: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/tools" component={ToolsRouter} />
            <Redirect to="/" />
        </Switch>
    )
}

const ToolsRouter: React.FC<RouteComponentProps> = (props) => {
    return (
        <Switch>
            <Route path={`${props.match.url}/${GuidGeneratorRoute.url}`} component={GuidGenerator} />
            <Redirect to="/" />
        </Switch>
    )
}
