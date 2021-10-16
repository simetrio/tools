/npm run build
PublishTools.exe -mode DeleteDirectory --name "../../docs"
PublishTools.exe -mode CopyDirectory --from "build" --to "../../docs"
PublishTools.exe -mode CreatePages --pages "src/app/Routes.ts" --to "../../docs/tools" --source "../../docs/index.html"
/pause