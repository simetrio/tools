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
            var url = commandLine.Get("--url");
            Console.WriteLine($"Create pages '{pages}' to '{to}' from source '{source}'");
            
            foreach (var page in Parse(pages))
            {
                Create(page, to, source, url);
            }
        }
        
        private IEnumerable<Page> Parse(string pagesPath)
        {
            var pagesText = Text.Load(pagesPath).SubstringAfter("AllRoutes");

            while (pagesText.Contains("{"))
            {
                var url = pagesText.SubstringAfter("{").SubstringAfter("url: \"").GetBefore("\"");
                var title = pagesText.SubstringAfter("title: \"").GetBefore("\"");
                var h1 = pagesText.SubstringAfter("h1: \"").GetBefore("\"");
                var text = pagesText.SubstringAfter("text: \"").GetBefore("\"");

                yield return new Page
                {
                    Url = url,
                    Title = title,
                    H1 = h1,
                    Text = text,
                };
            }
        }

        private void Create(Page page, string to, string source, string url)
        {
            var toDir = Path.Combine(to, page.Url);
            var toFile = Path.Combine(toDir, new FileInfo(source).Name);
            
            if (!Directory.Exists(toDir))
            {
                Directory.CreateDirectory(toDir);
            }

            var text = Encoding.UTF8.GetString(File.ReadAllBytes(source));

            text = text.Replace("{Title}", page.Title);
            text = text.Replace("{Canonical}", $"{url}{page.Url}/");
            text = text.Replace("{H1}", page.H1);
            text = text.Replace("{Text}", page.Text);
            
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
            public string H1 { get; set; }
            public string Text { get; set; }
        }
    }
}