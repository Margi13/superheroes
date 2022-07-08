module.exports = {
    "db": {
        "PORT": process.env.PORT || 5000,
        "DB_CONNECTION_STRING": process.env.DB_CONNECTION_STRING || "mongodb+srv://admin:admin123@bgcomics.lumx7.mongodb.net/?retryWrites=true&w=majority",
        "DEV_CONNECTION_STRING": "mongodb://localhost:27017/superheroes"
    }
}