using System;
using System.IO;
using System.Text;

namespace PublishTools.Tools
{
    public class ReplaceInFile : ITools
    {
        public void Execute(CommandLine commandLine)
        {
            var name = commandLine.Get("--name");
            var from = commandLine.Get("--from");
            var to = commandLine.Get("--to");
            Console.WriteLine($"Replace in file '{name}' from '{from}' to '{to}'");
            
            var text = Encoding.UTF8.GetString(File.ReadAllBytes(name));
            text = text.Replace(from, to);
            File.WriteAllBytes(name, Encoding.UTF8.GetBytes(text));
        }
    }
}