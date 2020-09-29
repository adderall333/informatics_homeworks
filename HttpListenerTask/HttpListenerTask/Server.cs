using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Net;
using System.Resources;
using System.Threading;
using System.Threading.Tasks;

namespace HttpListenerTask
{
    public class Server
    {
        private static HttpListener listener;
        private string[] prefixes;

        public bool IsRunning { get; private set; }

        public Server(string[] prefixesArray)
        {
            listener = new HttpListener();
            prefixes = prefixesArray;
            IsRunning = false;
        }

        public void Start()
        {
            var thread = new Thread(Run);
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
                var buffer = File.ReadAllBytes(url.Substring(1));
                response.ContentType = GetContentType(url);
                response.ContentLength64 = buffer.Length;
                
                var output = response.OutputStream;
                output.Write(buffer, 0, buffer.Length);
                output.Close();
            } 
        }

        private static string GetContentType(string url)
        {
            if (url.EndsWith("css"))
                return "text/css";
            if (url.EndsWith("js"))
                return "text/js";
            return "text/html";
        }
    }
}