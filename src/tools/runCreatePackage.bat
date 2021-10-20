set to=../../../template-js-tools
set exclude=git
set name1=template
set name2=Template

PublishTools.exe -mode CopyDirectory --from "../../../typescript-npm-package-template" --to %to% --exclude %exclude%
PublishTools.exe -mode CopyFile --from "../../../typescript-npm-package-template/.gitignore" --to %to%
PublishTools.exe -mode RenameFile --from %to%/src/template.ts --to %name1%.ts
PublishTools.exe -mode RenameFile --from %to%/src/__tests__/template.test.ts --to %name1%.test.ts
PublishTools.exe -mode ReplaceInAllFiles --name %to% --from "template" --to %name1%
PublishTools.exe -mode ReplaceInAllFiles --name %to% --from "Template" --to %name2%
