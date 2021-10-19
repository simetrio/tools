import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { Main } from "./Main";
import { AllRoutes } from "./Routes";

export const Router: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/tools" component={ToolsRouter} />
            <Redirect to="/" />
        </Switch>
    );
};

const ToolsRouter: React.FC<RouteComponentProps> = (props) => {
    return (
        <Switch>
            {AllRoutes.map((x) => (
                <Route key={x.url} path={`${props.match.url}/${x.url}`} component={x.component} />
            ))}
            <Redirect to="/" />
        </Switch>
    );
};
