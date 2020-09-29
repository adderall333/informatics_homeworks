using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace HttpListenerTask
{
    public class Server
    {
        private static HttpListener listener;
        private string[] prefixes;

        private static Dictionary<string, string> pages = new Dictionary<string, string>
        {
            {"/calculator.html", "templates/calculator.html"},
            {"/students.html", "templates/students.html"}
        };

        public bool IsRunning { get; private set; }

        public Server(string[] prefixesArray)
        {
            listener = new HttpListener();
            prefixes = prefixesArray;
            IsRunning = false;
        }

        public void Start()
        {
            var thread = new Thread(new ThreadStart(Run));
            thread.Start();
        }

        private void Run()
        {
            foreach (var prefix in prefixes)
                listener.Prefixes.Add(prefix);
            listener.Start();
            Listen().Wait();
        }
        
        private static async Task Listen()
        {
            while(true)
            {
                var context = await listener.GetContextAsync();
                var request = context.Request;
                var response = context.Response;
                
                var url = request.RawUrl;
                var buffer = new byte[1];

                if (url.EndsWith("css"))
                {
                    response.ContentType = "text/css";
                    buffer = File.ReadAllBytes(url.Substring(1));
                }
                if (url.EndsWith("js"))
                {
                    response.ContentType = "text/js";
                    buffer = File.ReadAllBytes(url.Substring(1));
                }
                if (url.EndsWith("html"))
                {
                    response.ContentType = "text/html";
                    buffer = File.ReadAllBytes(pages[url]);
                }

                response.ContentLength64 = buffer.Length;
                var output = response.OutputStream;
                output.Write(buffer, 0, buffer.Length);
                output.Close();
            } 
        }
    }
}