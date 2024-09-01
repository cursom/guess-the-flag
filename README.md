
# 🌎 Guess the Flag 

This API allows users to guess country names based on their flags. It supports multiple languages, providing translations for country names based on the language specified in the request.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cursom/guess-the-flag.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd flag-guess-api
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Run the application:**
   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`.

## Supported Languages 🌍

The API supports the following languages:

- **English** (`en`) 🇬🇧
- **Hungarian** (`hu`) 🇭🇺
- **Spanish** (`es`) 🇪🇸
- **French** (`fr`) 🇫🇷
- **German** (`de`) 🇩🇪
- **Italian** (`it`) 🇮🇹
- **Portuguese** (`pt`) 🇵🇹
- **Polish** (`pl`) 🇵🇱

## Example Request and Response

### Generate a Flag Guess `(POST /flag-guess/generate)`

To generate a random country flag with the name in a specified language:

**Example CURL Command:**
```bash
curl -X POST "http://localhost:3000/flag-guess/generate" -H "Content-Type: application/json" -d "{"lang":"it"}"
```

**Example Response:**
```json
{
  "id": "b1cab7d9-ad12-4869-ac6f-33e3d7d9d54e",
  "flag_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/flag_of_japan.svg/1920px-flag_of_japan.svg.png",
  "country_name": "giappone",
  "lang": "it"
}
```

### Check a Flag Guess `(POST /flag-guess/check)`

To check if the guessed country name is correct:

**Example CURL Command:**
```bash
curl -X POST "http://localhost:3000/flag-guess/check" -H "Content-Type: application/json" -d "{"id":"b1cab7d9-ad12-4869-ac6f-33e3d7d9d54e","guessed_name":"giappone","lang":"it"}"
```

**Example Response:**
```json
{
  "isCorrect": true
}
```

## SSL Configuration

The application can be configured to use SSL via the `.env` file:

### Steps to Enable SSL:

1. **Set up your .env file:**  
   Update the `.env` file to set `USE_HTTPS=true`, and specify the correct paths to your SSL key and certificate:

   ```env
   USE_HTTPS=true
   HTTPS_KEY_PATH=/path/to/your/ssl/key.pem
   HTTPS_CERT_PATH=/path/to/your/ssl/cert.pem
   ```

2. **Obtain SSL Certificates:**  
   Obtain SSL certificates from a trusted Certificate Authority (CA) or generate self-signed certificates for development purposes.

3. **Start the Server:**  
   Run the server with `npm start`, and it will now be accessible via HTTPS.
