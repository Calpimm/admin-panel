import React, { useState } from 'react';
import DocNavbar from './DocNavbar';
import DocSidebar from './DocSidebar';
import CodeWindow from './CodeWindow';

const ApiDocumentation = () => {
  const sections = [
    'Introduction',
    'Authentication',
    'Admin Endpoints',
    'Player Endpoints',
    'Ban Management',
    'Email Management',
    'Error Handling',
    'Usage Examples',
  ];
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const examples = {
    'Admin Endpoints - Register Admin': {
      curl: `curl -X POST https://lamronapi.me/admin/register \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer <admin-token>" \\
-d '{
  "username": "admin_username",
  "password": "admin_password",
  "role": "admin"
}'`,
      nodejs: `const axios = require('axios');
axios.post('https://lamronapi.me/admin/register', {
  username: 'admin_username',
  password: 'admin_password',
  role: 'admin'
}, {
  headers: {
    'Authorization': 'Bearer <admin-token>'
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error('Error registering admin:', error);
});`,
      python: `import requests

url = "https://lamronapi.me/admin/register"
payload = {
  "username": "admin_username",
  "password": "admin_password",
  "role": "admin"
}
headers = {
  "Authorization": "Bearer <admin-token>"
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
      cpp: `#include <iostream>
#include <curl/curl.h>

int main() {
    CURL *curl;
    CURLcode res;

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "https://lamronapi.me/admin/register");
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "{"username":"admin_username","password":"admin_password","role":"admin"}");

        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        headers = curl_slist_append(headers, "Authorization: Bearer <admin-token>");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        res = curl_easy_perform(curl);
        if(res != CURLE_OK)
            fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));

        curl_easy_cleanup(curl);
    }

    curl_global_cleanup();
    return 0;
}`,
      csharp: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        var client = new HttpClient();
        var content = new StringContent("{"username":"admin_username","password":"admin_password","role":"admin"}", Encoding.UTF8, "application/json");
        client.DefaultRequestHeaders.Add("Authorization", "Bearer <admin-token>");

        var response = await client.PostAsync("https://lamronapi.me/admin/register", content);
        var responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
    }
}`
    },
    'Admin Endpoints - Admin Login': {
      curl: `curl -X POST https://lamronapi.me/admin/login \\
-H "Content-Type: application/json" \\
-d '{
  "username": "admin_username",
  "password": "admin_password"
}'`,
      nodejs: `const axios = require('axios');
axios.post('https://lamronapi.me/admin/login', {
  username: 'admin_username',
  password: 'admin_password'
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error('Error logging in:', error);
});`,
      python: `import requests

url = "https://lamronapi.me/admin/login"
payload = {
  "username": "admin_username",
  "password": "admin_password"
}
response = requests.post(url, json=payload)
print(response.json())`,
      cpp: `#include <iostream>
#include <curl/curl.h>

int main() {
    CURL *curl;
    CURLcode res;

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "https://lamronapi.me/admin/login");
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "{"username":"admin_username","password":"admin_password"}");

        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        res = curl_easy_perform(curl);
        if(res != CURLE_OK)
            fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));

        curl_easy_cleanup(curl);
    }

    curl_global_cleanup();
    return 0;
}`,
      csharp: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        var client = new HttpClient();
        var content = new StringContent("{"username":"admin_username","password":"admin_password"}", Encoding.UTF8, "application/json");

        var response = await client.PostAsync("https://lamronapi.me/admin/login", content);
        var responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
    }
}`
    },
    'Admin Endpoints - Generate API Key': {
      curl: `curl -X POST https://lamronapi.me/admin/generate-api-key \\
-H "Authorization: Bearer <admin-token>"`,
      nodejs: `const axios = require('axios');
axios.post('https://lamronapi.me/admin/generate-api-key', {}, {
  headers: {
    'Authorization': 'Bearer <admin-token>'
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error('Error generating API key:', error);
});`,
      python: `import requests

url = "https://lamronapi.me/admin/generate-api-key"
headers = {
  "Authorization": "Bearer <admin-token>"
}
response = requests.post(url, headers=headers)
print(response.json())`,
      cpp: `#include <iostream>
#include <curl/curl.h>

int main() {
    CURL *curl;
    CURLcode res;

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "https://lamronapi.me/admin/generate-api-key");
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Authorization: Bearer <admin-token>");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        res = curl_easy_perform(curl);
        if(res != CURLE_OK)
            fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));

        curl_easy_cleanup(curl);
    }

    curl_global_cleanup();
    return 0;
}`,
      csharp: `using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", "Bearer <admin-token>");

        var response = await client.PostAsync("https://lamronapi.me/admin/generate-api-key", null);
        var responseString = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseString);
    }
}`
    },
    'Player Endpoints - Register Player': {
      curl: `curl -X POST https://lamronapi.me/register \\
-H "Content-Type: application/json" \\
-H "x-api-key: <api-key>" \\
-d '{
  "username": "player_username",
  "email": "player_email"
}'`,
      nodejs: `const axios = require('axios');
axios.post('https://lamronapi.me/register', {
  username: 'player_username',
  email: 'player_email'
}, {
  headers: {
    'x-api-key': '<api-key>'
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error('Error registering player:', error);
});`,
      python: `import requests

url = "https://lamronapi.me/register"
payload = {
  "username": "player_username",
  "email": "player_email"
}
headers = {
  "x-api-key": "<api-key>"
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
      cpp: `#include <iostream>
#include <curl/curl.h>

int main() {
    CURL *curl;
    CURLcode res;

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "https://lamronapi.me/register");
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS,
          curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "{"username":"player_username","email":"player_email"}");

          struct curl_slist *headers = NULL;
          headers = curl_slist_append(headers, "Content-Type: application/json");
          headers = curl_slist_append(headers, "x-api-key: <api-key>");
          curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  
          res = curl_easy_perform(curl);
          if(res != CURLE_OK)
              fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));
  
          curl_easy_cleanup(curl);
      }
  
      curl_global_cleanup();
      return 0;
  }`,
        csharp: `using System;
  using System.Net.Http;
  using System.Text;
  using System.Threading.Tasks;
  
  class Program
  {
      static async Task Main(string[] args)
      {
          var client = new HttpClient();
          var content = new StringContent("{"username":"player_username","email":"player_email"}", Encoding.UTF8, "application/json");
          client.DefaultRequestHeaders.Add("x-api-key", "<api-key>");
  
          var response = await client.PostAsync("https://lamronapi.me/register", content);
          var responseString = await response.Content.ReadAsStringAsync();
  
          Console.WriteLine(responseString);
      }
  }`
      },
      'Usage Examples - cURL Example': {
        curl: `curl -X POST https://lamronapi.me/admin/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "admin_username",
    "password": "admin_password"
  }'`,
        nodejs: `const axios = require('axios');
  axios.post('https://lamronapi.me/admin/login', {
    username: 'admin_username',
    password: 'admin_password'
  }).then(response => {
    console.log(response.data);
  }).catch(error => {
    console.error('Error logging in:', error);
  });`,
        python: `import requests
  
  url = "https://lamronapi.me/admin/login"
  payload = {
    "username": "admin_username",
    "password": "admin_password"
  }
  response = requests.post(url, json=payload)
  print(response.json())`,
        cpp: `#include <iostream>
  #include <curl/curl.h>
  
  int main() {
      CURL *curl;
      CURLcode res;
  
      curl_global_init(CURL_GLOBAL_DEFAULT);
      curl = curl_easy_init();
      if(curl) {
          curl_easy_setopt(curl, CURLOPT_URL, "https://lamronapi.me/admin/login");
          curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "{"username":"admin_username","password":"admin_password"}");
  
          struct curl_slist *headers = NULL;
          headers = curl_slist_append(headers, "Content-Type: application/json");
          curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  
          res = curl_easy_perform(curl);
          if(res != CURLE_OK)
              fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));
  
          curl_easy_cleanup(curl);
      }
  
      curl_global_cleanup();
      return 0;
  }`,
        csharp: `using System;
  using System.Net.Http;
  using System.Text;
  using System.Threading.Tasks;
  
  class Program
  {
      static async Task Main(string[] args)
      {
          var client = new HttpClient();
          var content = new StringContent("{"username":"admin_username","password":"admin_password"}", Encoding.UTF8, "application/json");
  
          var response = await client.PostAsync("https://lamronapi.me/admin/login", content);
          var responseString = await response.Content.ReadAsStringAsync();
  
          Console.WriteLine(responseString);
      }
  }`
      },
      'Usage Examples - Node.js Example': {
        nodejs: `const axios = require('axios');
        axios.post('https://lamronapi.me/admin/login', {
          username: 'admin_username',
          password: 'admin_password'
        }).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.error('Error logging in:', error);
        });`,
              python: `import requests
        
        url = "https://lamronapi.me/admin/login"
        payload = {
          "username": "admin_username",
          "password": "admin_password"
        }
        response = requests.post(url, json=payload)
        print(response.json())`,
              cpp: `#include <iostream>
        #include <curl/curl.h>
        
        int main() {
            CURL *curl;
            CURLcode res;
        
            curl_global_init(CURL_GLOBAL_DEFAULT);
            curl = curl_easy_init();
            if(curl) {
                curl_easy_setopt(curl, CURLOPT_URL, "https://lamronapi.me/admin/login");
                curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "{"username":"admin_username","password":"admin_password"}");
        
                struct curl_slist *headers = NULL;
                headers = curl_slist_append(headers, "Content-Type: application/json");
                curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        
                res = curl_easy_perform(curl);
                if(res != CURLE_OK)
                    fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));
        
                curl_easy_cleanup(curl);
            }
        
            curl_global_cleanup();
            return 0;
        }`,
              csharp: `using System;
        using System.Net.Http;
        using System.Text;
        using System.Threading.Tasks;
        
        class Program
        {
            static async Task Main(string[] args)
            {
                var client = new HttpClient();
                var content = new StringContent("{"username":"admin_username","password":"admin_password"}", Encoding.UTF8, "application/json");
        
                var response = await client.PostAsync("https://lamronapi.me/admin/login", content);
                var responseString = await response.Content.ReadAsStringAsync();
        
                Console.WriteLine(responseString);
            }
        }`
            }
          };
        
          const renderSectionContent = (section) => {
            switch (section) {
              case 'Introduction':
                return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
                    <p className="text-gray-300">
                      Lamron API is designed to facilitate communication between the client and the server for managing players, admins, and game-related data. The API is accessible at{' '}
                      <a href="https://lamronapi.me" className="text-blue-500">
                        https://lamronapi.me
                      </a>.
                    </p>
                    <p className="text-gray-300">
                      This documentation provides detailed information on each endpoint, including how to use them, request and response examples, and error handling.
                    </p>
                  </div>
                );
              case 'Authentication':
                return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Authentication</h2>
                    <p className="text-gray-300">
                      The API uses JWT (JSON Web Token) for authentication. Each request must include an <code>Authorization</code> header with the token:
                    </p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                      <code>Authorization: Bearer {'<token>'}</code>
                    </pre>
                    <p className="text-gray-300">For certain endpoints, an API key is required and should be included in the headers:</p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                      <code>x-api-key: {'<api-key>'}</code>
                    </pre>
                  </div>
                );
              case 'Admin Endpoints - Register Admin':
                return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Register Admin</h2>
                    <p className="text-gray-300">Registers a new admin.</p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                      <code>
                        URL: /admin/register<br />
                        Method: POST<br />
                        Headers: Authorization: Bearer {'<admin-token>'}<br />
                        Request Body:<br />
                        {`{
          "username": "admin_username",
          "password": "admin_password",
          "role": "admin"
        }`}
                      </code>
                    </pre>
                    {examples['Admin Endpoints - Register Admin'] && (
                      <CodeWindow examples={examples['Admin Endpoints - Register Admin']} />
                    )}
                  </div>
                );
              case 'Admin Endpoints - Admin Login':
                return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Admin Login</h2>
                    <p className="text-gray-300">Authenticates an admin.</p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                      <code>
                        URL: /admin/login<br />
                        Method: POST<br />
                        Headers: Content-Type: application/json<br />
                        Request Body:<br />
                        {`{
          "username": "admin_username",
          "password": "admin_password"
        }`}
                      </code>
                    </pre>
                    {examples['Admin Endpoints - Admin Login'] && (
                      <CodeWindow examples={examples['Admin Endpoints - Admin Login']} />
                    )}
                  </div>
                );
              case 'Admin Endpoints - Generate API Key':
                return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Generate API Key</h2>
                    <p className="text-gray-300">Generates a new API key for an admin.</p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                      <code>
                        URL: /admin/generate-api-key<br />
                        Method: POST<br />
                        Headers: Authorization: Bearer {'<admin-token>'}<br />
                        Response:<br />
                        {`{
          "apiKey": "<new-api-key>"
        }`}
                      </code>
                    </pre>
                    {examples['Admin Endpoints - Generate API Key'] && (
                      <CodeWindow examples={examples['Admin Endpoints - Generate API Key']} />
                    )}
                  </div>
                );
              case 'Admin Endpoints - Generate Moderator API Key':
                return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Generate Moderator API Key</h2>
                    <p className="text-gray-300">Generates a new API key for a moderator.</p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                      <code>
                        URL: /admin/generate-moderator-api-key<br />
                        Method: POST<br />
                        Headers: Authorization: Bearer {'<admin-token>'}<br />
                        Response:<br />
                        {`{
          "moderatorApiKey": "<new-moderator-api-key>"
        }`}
                      </code>
                    </pre>
                    {examples['Admin Endpoints - Generate Moderator API Key'] && (
                      <CodeWindow examples={examples['Admin Endpoints - Generate Moderator API Key']} />
                    )}
                  </div>
                );
              case 'Admin Endpoints - Get API Keys':
                return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Get API Keys</h2>
                    <p className="text-gray-300">Retrieves the API keys for an admin.</p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                      <code>
                        URL: /admin/get-api-key<br />
                        Method: GET<br />
                        Headers: Authorization: Bearer {'<admin-token>'}<br />
                        Response:<br />
                        {`{
          "apiKey": "<admin-api-key>",
          "moderatorApiKey": "<moderator-api-key>"
        }`}
                      </code>
                    </pre>
                    {examples['Admin Endpoints - Get API Keys'] && (
                      <CodeWindow examples={examples['Admin Endpoints - Get API Keys']} />
                    )}
                  </div>
                );
              case 'Admin Endpoints - Fetch Moderators':
                return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Fetch Moderators</h2>
                    <p className="text-gray-300">Retrieves all moderators.</p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                      <code>
                        URL: /moderators<br />
                        Method: GET<br />
                        Headers: Authorization: Bearer {'<admin-token>'}<br />
                        Response:<br />
                        {`[
          {
            "username": "moderator_username",
            "role": "moderator",
            "bannedUntil": null
          }
        ]`}
                      </code>
                    </pre>
                    {examples['Admin Endpoints - Fetch Moderators'] && (
                      <CodeWindow examples={examples['Admin Endpoints - Fetch Moderators']} />
                    )}
                  </div>
                );
              case 'Player Endpoints - Register Player':
                return (
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Register Player</h2>
                    <p className="text-gray-300">Registers a new player.</p>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                    <code>
                URL: /register<br />
                Method: POST<br />
                Headers: x-api-key: {'<api-key>'}<br />
                Request Body:<br />
                {`{
  "username": "player_username",
  "email": "player_email"
}`}
              </code>
            </pre>
            {examples['Player Endpoints - Register Player'] && (
              <CodeWindow examples={examples['Player Endpoints - Register Player']} />
            )}
          </div>
        );
      case 'Player Endpoints - Player Login':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Player Login</h2>
            <p className="text-gray-300">Authenticates a player.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /login<br />
                Method: POST<br />
                Headers: x-api-key: {'<api-key>'}<br />
                Request Body:<br />
                {`{
  "email": "player_email",
  "playerId": "player_id",
  "token": "jwt-token"
}`}
                <br />
                Response:<br />
                {`{
  "message": "Login successful",
  "playerId": "<player-id>",
  "token": "<jwt-token>",
  "bannedUntil": null
}`}
              </code>
            </pre>
            {examples['Player Endpoints - Player Login'] && (
              <CodeWindow examples={examples['Player Endpoints - Player Login']} />
            )}
          </div>
        );
      case 'Player Endpoints - Verify Email':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Verify Email</h2>
            <p className="text-gray-300">Verifies a player's email.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /verify-email<br />
                Method: GET<br />
                Query Params: token={'<jwt-token>'}<br />
                Response:<br />
                {`{
  "message": "Email verified successfully."
}`}
              </code>
            </pre>
            {examples['Player Endpoints - Verify Email'] && (
              <CodeWindow examples={examples['Player Endpoints - Verify Email']} />
            )}
          </div>
        );
      case 'Player Endpoints - Update Score':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Update Score</h2>
            <p className="text-gray-300">Updates a player's score.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /update-score<br />
                Method: POST<br />
                Headers: x-api-key: {'<api-key>'}<br />
                Request Body:<br />
                {`{
  "playerId": "player_id",
  "score": "new_score"
}`}
                <br />
                Response:<br />
                {`{
  "message": "Score updated successfully."
}`}
              </code>
            </pre>
            {examples['Player Endpoints - Update Score'] && (
              <CodeWindow examples={examples['Player Endpoints - Update Score']} />
            )}
          </div>
        );
      case 'Player Endpoints - Update Multiple Scores':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Update Multiple Scores</h2>
            <p className="text-gray-300">Updates multiple players' scores.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /update-scores<br />
                Method: POST<br />
                Headers: x-api-key: {'<admin-api-key>'}<br />
                Request Body:<br />
                {`{
  "scores": [
    { "playerId": "player_id1", "score": "new_score1" },
    { "playerId": "player_id2", "score": "new_score2" }
  ]
}`}
                <br />
                Response:<br />
                {`{
  "message": "Scores updated successfully."
}`}
              </code>
            </pre>
            {examples['Player Endpoints - Update Multiple Scores'] && (
              <CodeWindow examples={examples['Player Endpoints - Update Multiple Scores']} />
            )}
          </div>
        );
      case 'Player Endpoints - Get Top Players':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Get Top Players</h2>
            <p className="text-gray-300">Retrieves the top 10 players by score.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /top-players<br />
                Method: GET<br />
                Headers: x-api-key: {'<api-key>'}<br />
                Response:<br />
                {`[
  {
    "username": "player_username",
    "score": "player_score"
  }
]`}
              </code>
            </pre>
            {examples['Player Endpoints - Get Top Players'] && (
              <CodeWindow examples={examples['Player Endpoints - Get Top Players']} />
            )}
          </div>
        );
      case 'Player Endpoints - Fetch All Players':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Fetch All Players</h2>
            <p className="text-gray-300">Retrieves all players.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /players<br />
                Method: GET<br />
                Headers: x-api-key: {'<api-key>'}<br />
                Response:<br />
                {`[
  {
    "username": "player_username",
    "score": "player_score",
    "isVerified": true,
    "bannedUntil": null
  }
]`}
              </code>
            </pre>
            {examples['Player Endpoints - Fetch All Players'] && (
              <CodeWindow examples={examples['Player Endpoints - Fetch All Players']} />
            )}
          </div>
        );
      case 'Player Endpoints - Delete Player':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Delete Player</h2>
            <p className="text-gray-300">Deletes a player by ID.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /players/:playerId<br />
                Method: DELETE<br />
                Headers: x-api-key: {'<api-key>'}<br />
                Response:<br />
                {`{
  "success": true,
  "message": "Player deleted successfully."
}`}
              </code>
            </pre>
            {examples['Player Endpoints - Delete Player'] && (
              <CodeWindow examples={examples['Player Endpoints - Delete Player']} />
            )}
          </div>
        );
      case 'Ban Management - Ban User':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Ban User</h2>
            <p className="text-gray-300">Bans a player or moderator.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /ban-user<br />
                Method: POST<br />
                Headers: Authorization: Bearer {'<admin-token>'}<br />
                Request Body:<br />
                {`{
  "userId": "user_id",
  "userType": "player or moderator",
  "banDuration": "duration_in_minutes",
  "reason": "ban_reason"
}`}
                <br />
                Response:<br />
                {`{
  "message": "User banned successfully.",
  "banUntil": "<ban_until_date>"
}`}
              </code>
            </pre>
            {examples['Ban Management - Ban User'] && (
              <CodeWindow examples={examples['Ban Management - Ban User']} />
            )}
          </div>
        );
      case 'Ban Management - Fetch Ban History':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Fetch Ban History</h2>
            <p className="text-gray-300">Retrieves the ban history.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /ban-history<br />
                Method: GET<br />
                Headers: Authorization: Bearer {'<admin-token>'}<br />
                Response:<br />
                {`[
  {
    "userId": "user_id",
    "userType": "player or moderator",
    "banDuration": "duration_in_minutes",
    "reason": "ban_reason",
    "bannedUntil": "<ban_until_date>",
    "createdAt": "<ban_created_date>"
  }
]`}
              </code>
            </pre>
            {examples['Ban Management - Fetch Ban History'] && (
              <CodeWindow examples={examples['Ban Management - Fetch Ban History']} />
            )}
          </div>
        );
      case 'Email Management - Send Email to Various Groups':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Send Email to Various Groups</h2>
            <p className="text-gray-300">Sends email to specified groups (company, test team, players).</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /send-company-mail, /send-test-team-mail, /send-players-mail<br />
                Method: POST<br />
                Request Body:<br />
                {`{
  "senderName": "sender_name",
  "mailContent": "email_content",
  "recipients": "comma_separated_emails",
  "isHtml": true_or_false,
  "subject": "email_subject"
}`}
                <br />
                Response:<br />
                {`{
  "success": true,
  "message": "Mail sent successfully",
  "info": "<info>"
}`}
              </code>
            </pre>
            {examples['Email Management - Send Email to Various Groups'] && (
              <CodeWindow examples={examples['Email Management - Send Email to Various Groups']} />
            )}
          </div>
        );
      case 'Email Management - Send Email to Subscribers':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Send Email to Subscribers</h2>
            <p className="text-gray-300">Sends email to all subscribers.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /send-subscribed-mail<br />
                Method: POST<br />
                Request Body:<br />
                {`{
  "senderName": "sender_name",
  "mailContent": "email_content",
  "isHtml": true_or_false,
  "subject": "email_subject"
}`}
                <br />
                Response:<br />
                {`{
  "success": true,
  "message": "Mail sent successfully",
  "info": "<info>"
}`}
              </code>
            </pre>
            {examples['Email Management - Send Email to Subscribers'] && (
              <CodeWindow examples={examples['Email Management - Send Email to Subscribers']} />
            )}
          </div>
        );
      case 'Email Management - Subscribe':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Subscribe</h2>
            <p className="text-gray-300">Subscribes a new user to the mailing list.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /subscribe<br />
                Method: POST<br />
                Request Body:<br />
                {`{
  "email": "user_email"
}`}
                <br />
                Response:<br />
                {`{
  "message": "Subscription successful"
}`}
              </code>
            </pre>
            {examples['Email Management - Subscribe'] && (
              <CodeWindow examples={examples['Email Management - Subscribe']} />
            )}
          </div>
        );
      case 'Email Management - Unsubscribe':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Unsubscribe</h2>
            <p className="text-gray-300">Unsubscribes a user from the mailing list.</p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
              <code>
                URL: /unsubscribe<br />
                Method: GET<br />
                Query Params: email=user_email<br />
                Response:<br />
                {`{
  "message": "Your email address has been unsubscribed."
}`}
              </code>
            </pre>
            {examples['Email Management - Unsubscribe'] && (
              <CodeWindow examples={examples['Email Management - Unsubscribe']} />
            )}
          </div>
        );
      case 'Error Handling':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Error Handling</h2>
            <p className="text-gray-300">
              In case of errors, the API responds with appropriate HTTP status codes and a message explaining the error. For example:
            </p>
            <ul className="list-disc pl-6">
              <li className="text-gray-300">
                <strong>400 Bad Request</strong>: Missing or invalid parameters.
              </li>
              <li className="text-gray-300">
                <strong>401 Unauthorized</strong>: Missing or invalid token.
              </li>
              <li className="text-gray-300">
                <strong>403 Forbidden</strong>: Access denied.
              </li>
              <li className="text-gray-300">
                <strong>404 Not Found</strong>: Resource not found.
              </li>
              <li className="text-gray-300">
                <strong>500 Internal Server Error</strong>: An error occurred on the server.
              </li>
            </ul>
          </div>
        );
      case 'Usage Examples - cURL Example':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">cURL Example</h2>
            <p className="text-gray-300">
              <strong>Admin Login:</strong>
            </p>
            <CodeWindow examples={examples['Usage Examples - cURL Example']} />
            <p className="text-gray-300">
              <strong>Register Player:</strong>
            </p>
            <CodeWindow examples={examples['Player Endpoints - Register Player']} />
          </div>
        );
      case 'Usage Examples - Node.js Example':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Node.js Example</h2>
            <p className="text-gray-300">
              <strong>Fetch Top Players:</strong>
            </p>
            <CodeWindow examples={examples['Usage Examples - Node.js Example']} />
          </div>
        );
      case 'Usage Examples - Python Example':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Python Example</h2>
            <p className="text-gray-300">
              <strong>Admin Login:</strong>
            </p>
            <CodeWindow examples={examples['Usage Examples - cURL Example']} />
            <p className="text-gray-300">
              <strong>Register Player:</strong>
            </p>
            <CodeWindow examples={examples['Player Endpoints - Register Player']} />
          </div>
        );
      case 'Usage Examples - C++ Example':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">C++ Example</h2>
            <p className="text-gray-300">
              <strong>Admin Login:</strong>
            </p>
            <CodeWindow examples={examples['Usage Examples - cURL Example']} />
            <p className="text-gray-300">
              <strong>Register Player:</strong>
            </p>
            <CodeWindow examples={examples['Player Endpoints - Register Player']} />
          </div>
        );
      case 'Usage Examples - C# Example':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">C# Example</h2>
            <p className="text-gray-300">
              <strong>Admin Login:</strong>
            </p>
            <CodeWindow examples={examples['Usage Examples - cURL Example']} />
            <p className="text-gray-300">
              <strong>Register Player:</strong>
            </p>
            <CodeWindow examples={examples['Player Endpoints - Register Player']} />
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Select a section from the sidebar</h2>
          </div>
        );
    }
  };

 return (
    <div className="flex bg-gray-900 text-gray-200 min-h-screen">
      <DocNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      <DocSidebar sections={sections} onSelectSection={setSelectedSection} isSidebarOpen={isSidebarOpen} />
      <main className={`flex-1 transition-all duration-1000 transform ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'} ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="pt-24 p-4">
          {renderSectionContent(selectedSection)}
        </div>
      </main>
    </div>
  );
};

export default ApiDocumentation;

