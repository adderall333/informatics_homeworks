using System;
using System.IO;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace HttpListenerTask
{
    class Program
    {
        static void Main(string[] args)
        {
            var server = new Server(new [] { "http://localhost:8888/" });
            server.Start();
        }
    }
}