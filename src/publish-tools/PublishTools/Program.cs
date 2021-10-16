namespace PublishTools
{
    class Program
    {
        static void Main(string[] args)
        {
            var commandLine = CommandLine.Parse(args);
            var tools = ToolsFinder.Find(commandLine);
            tools.Execute(commandLine);
        }
    }
}