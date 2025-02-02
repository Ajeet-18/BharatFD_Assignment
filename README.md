# FAQ Server API

This is a backend API built with **Express.js**, **MongoDB**, and **Redis**. It provides an endpoint for managing Frequently Asked Questions (FAQs) using MongoDB for data storage and Redis for caching. The API can be extended to include more routes and features as needed.

## Features

- **MongoDB**: Used for storing FAQ data.
- **Redis**: Used for caching FAQ responses to improve performance.
- **Express.js**: The framework used to build the API.
- **CORS**: Middleware to handle Cross-Origin Resource Sharing.
- **Environment Variables**: Managed using the `.env` file.
- **API Endpoint**: `/api/faqs` for accessing the FAQ data.

## Setup & Installation

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/faq-server-api.git
cd faq-server-api
```

### 2. Install Dependencies

Make sure you have `Node.js` and `npm` installed. Then, run the following command to install the required dependencies:

```bash
npm install
```

### 3. Create a `.env` File

Create a `.env` file at the root of the project and add the following variables:

```bash
MONGO_URI=your-mongodb-uri
REDIS_URL=your-redis-url
PORT=8000
```

- **MONGO_URI**: The URI to connect to your MongoDB instance (e.g., `mongodb://localhost:27017/yourdbname`).
- **REDIS_URL**: The URL to connect to your Redis instance (e.g., `redis://localhost:6379`).
- **PORT**: (Optional) The port to run the server on. Default is 8000.

### 4. Start the Server

Run the following command to start the server:

```bash
npm start
```

If everything is set up correctly, you should see:

```
✅ MongoDB Connected
✅ Connected to Redis
🚀 Server running on port 8000
```

### 5. Run Tests (Optional)

To run tests, use the following command:

```bash
npm test
```

### 6. Testing API

Once the server is running, you can interact with the API at `http://localhost:8000/api/faqs`.

You can test the API using tools like **Postman** or **curl** to make requests to the available routes.

## API Endpoints

- **GET** `/api/faqs`: Fetch a list of all FAQs from the database. Data is cached in Redis for better performance.
  
- **POST** `/api/faqs`: Create a new FAQ. Requires a JSON payload with the question and answer.

- **GET** `/api/faqs/:id`: Get a specific FAQ by its ID.

- **PUT** `/api/faqs/:id`: Update a specific FAQ by its ID.

- **DELETE** `/api/faqs/:id`: Delete a specific FAQ by its ID.

## Technologies Used

- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing FAQ data.
- **Redis**: In-memory data structure store used for caching FAQ responses.
- **CORS**: Middleware to allow cross-origin requests.
- **dotenv**: Loads environment variables from a `.env` file.

## Contributing

Feel free to fork the repository, create an issue, or submit a pull request.

## License

This project is licensed under the MIT License.

---

This README provides the essential setup and usage instructions for your project. You can modify it as needed, especially for the `MONGO_URI` and `REDIS_URL` fields in the `.env` configuration.
