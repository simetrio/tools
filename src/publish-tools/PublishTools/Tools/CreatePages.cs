using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace PublishTools.Tools
{
    public class CreatePages : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            var pages = commandLine.Get("--pages");
            var to = commandLine.Get("--to");
            var source = commandLine.Get("--source");
            Console.WriteLine($"Create pages '{pages}' to '{to}' from source '{source}'");
            
            foreach (var page in Parse(pages))
            {
                Create(page, to, source);
            }
        }
        
        private IEnumerable<Page> Parse(string pagesPath)
        {
            var text = Text.Load(pagesPath).SubstringAfter("AllRoutes");

            while (text.Contains("{"))
            {
                var url = text.SubstringAfter("{").SubstringAfter("url: \"").GetBefore("\"");
                var title = text.SubstringAfter("title: \"").GetBefore("\"");

                yield return new Page
                {
                    Url = url,
                    Title = title,
                };
            }
        }

        private void Create(Page page, string to, string source)
        {
            var toDir = Path.Combine(to, page.Url);
            var toFile = Path.Combine(toDir, new FileInfo(source).Name);
            
            if (!Directory.Exists(toDir))
            {
                Directory.CreateDirectory(toDir);
            }

            var text = Encoding.UTF8.GetString(File.ReadAllBytes(source));

            text = text.Replace("{Title}", page.Title);
            
            File.WriteAllBytes(toFile, Encoding.UTF8.GetBytes(text));
        }
        
        private class Text
        {
            private string _text;

            private Text(string text)
            {
                _text = text;
            }

            public Text SubstringAfter(string after)
            {
                _text = _text.Substring(_text.IndexOf(after, StringComparison.Ordinal) + after.Length);
                return this;
            }

            public string GetBefore(string before)
            {
                return _text.Substring(0, _text.IndexOf(before, StringComparison.Ordinal));
            }

            public bool Contains(string value)
            {
                return _text.IndexOf(value, StringComparison.Ordinal) != -1;
            }

            public static Text Load(string path)
            {
                return new Text(File.ReadAllText(path));
            }
        }
        
        private class Page
        {
            public string Url { get; set; }
            public string Title { get; set; }
        }
    }
}