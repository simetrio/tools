PublishTools.exe -mode DeleteDirectory --name "../../docs"
PublishTools.exe -mode CopyDirectory --from "build" --to "../../docs"
PublishTools.exe -mode ReplaceInFile --name "../../docs/index.html" --from "{Title}" --to "Olrix Tools"
PublishTools.exe -mode CreatePages --pages "src/app/Routes.ts" --to "../../docs/tools" --source "build/index.html"