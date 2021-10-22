using System;
using System.IO;
using System.Linq;
using System.Text;

namespace PublishTools.Tools
{
    public class CreateSiteMap : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            var on = commandLine.Get("--on");
            var url = commandLine.Get("--url");
            Console.WriteLine($"Create site map on '{on}' url '{url}'");

            var urls = GetUrls(on);
            var siteMap = Create(url, urls);
            Save(on, siteMap);
        }

        private Url[] GetUrls(string on)
        {
            var fromDir = new DirectoryInfo(on);

            return Directory
                .GetFiles(fromDir.FullName, "index.html", SearchOption.AllDirectories)
                .Select(x => Url.Create(fromDir, x))
                .ToArray();
        }

        private string Create(string start, Url[] urls)
        {
            var siteMap = new StringBuilder();

            siteMap.AppendLine(@"<?xml version=""1.0"" encoding=""UTF-8""?>");
            siteMap.AppendLine(@"<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">");

            foreach (var url in urls)
            {
                var loc = string.IsNullOrEmpty(url.Path) ? start : $"{start}{url.Path}/";
                siteMap.AppendLine($"<url><loc>{loc}</loc><lastmod>{url.DateUpdate:yyyy-MM-dd}</lastmod></url>");
            }

            siteMap.AppendLine(@"</urlset>");

            return siteMap.ToString();
        }

        private void Save(string on, string siteMap)
        {
            var fileName = Path.Combine(on, "sitemap.xml");
            File.WriteAllText(fileName, siteMap, Encoding.UTF8);
        }

        private class Url
        {
            public string Path { get; set; }
            public DateTime DateUpdate { get; set; }

            public static Url Create(DirectoryInfo fromDir, string filePath)
            {
                var fileInfo = new FileInfo(filePath);
                var path = new FileInfo(filePath)
                    .DirectoryName!
                    .Replace(fromDir.FullName, "")
                    .Replace("\\", "/")
                    .Trim('/');

                return new Url
                {
                    Path = path,
                    DateUpdate = fileInfo.LastWriteTime
                };
            }
        }
    }
}