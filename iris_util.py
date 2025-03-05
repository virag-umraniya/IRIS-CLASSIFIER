import json
import pickle
import numpy as np

__data_columns = None
__model = None

def predict_flower(sepal_length, sepal_width, petal_length, petal_width):
    x = np.array([sepal_length, sepal_width, petal_length, petal_width])
    return __model.predict([x])[0]

def load_saved_artifacts():
    print("Loading saved artifacts...start")
    global __data_columns

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)["data_columns"]
    global __model
    with open("iris_artifacts.py\iris_model.pkl", "rb") as f:
        __model = pickle.load(f)
    print("Artifacts loaded successfully!")

if __name__ == '__main__':
    load_saved_artifacts()
    # Example prediction
    print(predict_flower(5.1, 3.5, 1.4, 0.2))  # This prints the predicted flower species
