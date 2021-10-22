import { RouteComponentProps } from "react-router";
import { Base64EncodeDecode } from "../tools/base64-encode-decode/Base64EncodeDecode";
import { Base64EncodeFileOrImage } from "../tools/base64-encode-file-or-image/Base64EncodeFileOrImage";
import { GuidGenerator } from "../tools/guid-generator/GuidGenerator";
import { HtmlEncodeDecode } from "../tools/html-encode-decode/HtmlEncodeDecode";
import { JavaScriptOnlineEditor } from "../tools/javascript-online-editor/JavaScriptOnlineEditor";
import { JsonFormatter } from "../tools/json-formatter/JsonFormatter";
import { JsonViewer } from "../tools/json-viewer/JsonViewer";
import { LoanCalculator } from "../tools/loan-calculator/LoanCalculator";
import { Md5Generator } from "../tools/md5-generator/Md5Generator";
import { Sha1Generator } from "../tools/sha1-generator/Sha1Generator";
import { Sha256Generator } from "../tools/sha256-generator/Sha256Generator";
import { TextDifferences } from "../tools/text-differences/TextDifferences";
import { TranslitFromRussianToEnglish } from "../tools/translit-from-russian-to-english/TranslitFromRussianToEnglish";
import { UnicodeToUtf8Converter } from "../tools/unicode-to-utf8-converter/UnicodeToUtf8Converter";
import { UnitConverter } from "../tools/unit-converter/UnitConverter";
import { UrlEncodeDecode } from "../tools/url-encode-decode/UrlEncodeDecode";
import { WordCounter } from "../tools/word-counter/WordCounter";

export interface Route {
    url: string;
    name: string;
    title: string;
    text: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | undefined;
}

export const AllRoutes: Route[] = [
    {
        url: "javascript-online-editor",
        name: "JavaScript Editor",
        title: "Online JavaScript Editor - Olrix Tools",
        text: "",
        component: JavaScriptOnlineEditor,
    },
    {
        url: "json-viewer",
        name: "Json Viewer",
        title: "Online Json Viewer - Olrix Tools",
        text: "",
        component: JsonViewer,
    },
    {
        url: "json-formatter",
        name: "Json Formatter",
        title: "Online Json Formatter - Olrix Tools",
        text: "",
        component: JsonFormatter,
    },
    {
        url: "text-differences",
        name: "Differences Between Texts",
        title: "Online Finding Differences Between Texts - Olrix Tools",
        text: "",
        component: TextDifferences,
    },
    {
        url: "translit-from-russian-to-english",
        name: "Translit From Russian",
        title: "Online Translint From Russian To English - Olrix Tools",
        text: "",
        component: TranslitFromRussianToEnglish,
    },
    {
        url: "unit-converter",
        name: "Unit Converter",
        title: "Online Unit Converter - Olrix Tools",
        text: "",
        component: UnitConverter,
    },
    {
        url: "loan-calculator",
        name: "Loan Calculator",
        title: "Online Loan Calculator - Olrix Tools",
        text: "",
        component: LoanCalculator,
    },
    {
        url: "guid-generator",
        name: "Guid Generator",
        title: "Online Guid Generator - Olrix Tools",
        text: "<h2>What is a GUID?</h2> <p>This is a unique 128-bit identifier. Its peculiarity is uniqueness, it allows you to generate random identifiers without the risk of repetition. The total number of GUID keys is very large (2<sup>128</sup>). The abbreviation GUID was introduced by Microsoft. The rest of the world uses the term UUID.</p> <h2>What does a GUID look like?</h2> <p>Consists of thirty-two hexadecimal digits, separated by hyphens. They can also be surrounded by curly braces. For example: 2170abcb-8499-47de-be64-8cc8b290ebd5</p> <h2>How is it used?</h2> <p>GUID is used as a unique identifier in programming as keys in a database. Due to the high uniqueness of the UUID, when generating it, you don't have to worry about checking duplicates.</p>",
        component: GuidGenerator,
    },
    {
        url: "url-encode-decode",
        name: "Url Encode/Decode",
        title: "Online Url Encode/Decode - Olrix Tools",
        text: "",
        component: UrlEncodeDecode,
    },
    {
        url: "html-encode-decode",
        name: "Html Encode/Decode",
        title: "Online Html Encode/Decode - Olrix Tools",
        text: "",
        component: HtmlEncodeDecode,
    },
    {
        url: "base64-encode-decode",
        name: "Base64 Encode/Decode Text",
        title: "Online Base64 Encode/Decode Text - Olrix Tools",
        text: "",
        component: Base64EncodeDecode,
    },
    {
        url: "base64-encode-file-or-image",
        name: "Base64 Encode File Or Image",
        title: "Online Base64 Encode File Or Image - Olrix Tools",
        text: "",
        component: Base64EncodeFileOrImage,
    },
    {
        url: "md5-generator",
        name: "MD5 Generator",
        title: "Online MD5 Generator - Olrix Tools",
        text: "",
        component: Md5Generator,
    },
    {
        url: "sha1-generator",
        name: "SHA1 Generator",
        title: "Online SHA1 Generator - Olrix Tools",
        text: "",
        component: Sha1Generator,
    },
    {
        url: "sha256-generator",
        name: "SHA256 Generator",
        title: "Online SHA256 Generator - Olrix Tools",
        text: "",
        component: Sha256Generator,
    },
    {
        url: "unicode-to-utf8-converter",
        name: "Unicode To UTF8 Converter",
        title: "Online Unicode To UTF8 Converter - Olrix Tools",
        text: "",
        component: UnicodeToUtf8Converter,
    },
    {
        url: "word-counter",
        name: "Word Counter",
        title: "Online Word Counter - Olrix Tools",
        text: "",
        component: WordCounter,
    },
];
