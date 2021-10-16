import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { Main } from "./Main";
import { 
    Base64EncodeDecodeRoute, 
    Base64EncodeFileOrImageRoute, 
    GuidGeneratorRoute, 
    HtmlEncodeDecodeRoute, 
    JsonFormatterRoute, 
    JsonViewerRoute, 
    LoanCalculatorRoute, 
    Md5GeneratorRoute, 
    Sha1GeneratorRoute, 
    Sha256GeneratorRoute, 
    TextDifferencesRoute, 
    TranslitFromRussianToEnglishRoute, 
    UnitConverterRoute, 
    UrlEncodeDecodeRoute 
} from "./Routes";
import { TranslitFromRussianToEnglish } from "../tools/translit-from-russian-to-english/TranslitFromRussianToEnglish";
import { GuidGenerator } from "../tools/guid-generator/GuidGenerator";
import { UrlEncodeDecode } from "../tools/url-encode-decode/UrlEncodeDecode";
import { HtmlEncodeDecode } from "../tools/html-encode-decode/HtmlEncodeDecode";
import { Base64EncodeDecode } from "../tools/base64-encode-decode/Base64EncodeDecode";
import { Sha256Generator } from "../tools/sha256-generator/Sha256Generator";
import { Sha1Generator } from "../tools/sha1-generator/Sha1Generator";
import { Md5Generator } from "../tools/md5-generator/Md5Generator";
import { TextDifferences } from "../tools/text-differences/TextDifferences";
import { JsonFormatter } from "../tools/json-formatter/JsonFormatter";
import { JsonViewer } from "../tools/json-viewer/JsonViewer";
import { UnitConverter } from "../tools/unit-converter/UnitConverter";
import { LoanCalculator } from "../tools/loan-calculator/LoanCalculator";
import { Base64EncodeFileOrImage } from "../tools/base64-encode-file-or-image/Base64EncodeFileOrImage";

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
            <Route path={`${props.match.url}/${JsonViewerRoute.url}`} component={JsonViewer} />
            <Route path={`${props.match.url}/${JsonFormatterRoute.url}`} component={JsonFormatter} />
            <Route path={`${props.match.url}/${TextDifferencesRoute.url}`} component={TextDifferences} />
            <Route path={`${props.match.url}/${TranslitFromRussianToEnglishRoute.url}`} component={TranslitFromRussianToEnglish} />
            <Route path={`${props.match.url}/${UnitConverterRoute.url}`} component={UnitConverter} />
            <Route path={`${props.match.url}/${LoanCalculatorRoute.url}`} component={LoanCalculator} />
            <Route path={`${props.match.url}/${GuidGeneratorRoute.url}`} component={GuidGenerator} />
            <Route path={`${props.match.url}/${UrlEncodeDecodeRoute.url}`} component={UrlEncodeDecode} />
            <Route path={`${props.match.url}/${HtmlEncodeDecodeRoute.url}`} component={HtmlEncodeDecode} />
            <Route path={`${props.match.url}/${Base64EncodeDecodeRoute.url}`} component={Base64EncodeDecode} />
            <Route path={`${props.match.url}/${Base64EncodeFileOrImageRoute.url}`} component={Base64EncodeFileOrImage} />
            <Route path={`${props.match.url}/${Md5GeneratorRoute.url}`} component={Md5Generator} />
            <Route path={`${props.match.url}/${Sha1GeneratorRoute.url}`} component={Sha1Generator} />
            <Route path={`${props.match.url}/${Sha256GeneratorRoute.url}`} component={Sha256Generator} />
            <Redirect to="/" />
        </Switch>
    )
}
