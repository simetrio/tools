using System.Collections.Generic;

namespace PublishTools
{
    public class CommandLine
    {
        private readonly Dictionary<string, string> _args;

        private CommandLine(Dictionary<string, string> args)
        {
            _args = args;
        }

        public string Get(string name) => _args[name];

        public string TryGet(string name) => _args.TryGetValue(name, out var value) ? value : null;

        public static CommandLine Parse(string[] args)
        {
            var argsDic = new Dictionary<string, string>();
            
            for (var i = 0; i < args.Length - 1; i += 2)
            {
                argsDic[args[i]] = args[i + 1];
            }

            return new CommandLine(argsDic);
        }
    }
}