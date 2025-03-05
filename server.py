from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import pickle
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# Load the trained logistic regression model
model_filename = "iris_logistic_regression_model.pkl"
with open(model_filename, "rb") as file:
    model = pickle.load(file)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve index.html at the root URL
@app.get("/")
async def serve_index():
    return FileResponse("index.html")

# Serve CSS and JS files explicitly
@app.get("/style.css")
async def get_css():
    return FileResponse("style.css")

@app.get("/script.js")
async def get_js():
    return FileResponse("script.js")

# Serve other HTML pages
@app.get("/about")
async def serve_about():
    return FileResponse("about.html")

@app.get("/contact")
async def serve_contact():
    return FileResponse("contact.html")

app.mount("/static", StaticFiles(directory="static"), name="static")

# Define request body schema
class IrisRequest(BaseModel):
    sepalLength: float
    sepalWidth: float
    petalLength: float
    petalWidth: float

# Prediction API
@app.post("/predict")
async def predict_species(iris: IrisRequest):
    try:
        # Convert input data to numpy array
        features = np.array([[iris.sepalLength, iris.sepalWidth, iris.petalLength, iris.petalWidth]])

        # Make prediction
        prediction = model.predict(features)[0]

        # Return prediction as JSON
        return JSONResponse(content={"prediction": prediction})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Run FastAPI server (if directly executed)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
