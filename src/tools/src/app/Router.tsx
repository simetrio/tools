import { Switch, Route, Redirect, RouteComponentProps } from "react-router";
import { GuidGenerator } from "../guid-generator/GuidGenerator";
import { Main } from "../main/Main";
import { GuidGeneratorRoute } from "./Routes";

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
