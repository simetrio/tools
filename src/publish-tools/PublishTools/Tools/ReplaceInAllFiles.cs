using System;
using System.IO;
using System.Text;

namespace PublishTools.Tools
{
    public class ReplaceInAllFiles : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            var name = commandLine.Get("--name");
            var from = commandLine.Get("--from");
            var to = commandLine.Get("--to");
            Console.WriteLine($"Replace in all files '{name}' from '{from}' to '{to}'");

            var fromDir = new DirectoryInfo(name);
            
            foreach (var filePath in Directory.GetFiles(fromDir.FullName, "*.*", SearchOption.AllDirectories))
            {
                var text = Encoding.UTF8.GetString(File.ReadAllBytes(filePath));
                if (!text.Contains(from)) continue;
                
                text = text.Replace(from, to);
                File.WriteAllBytes(filePath, Encoding.UTF8.GetBytes(text));
            }
        }
    }
}