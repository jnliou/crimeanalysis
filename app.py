from flask import Flask, jsonify
from flask_cors import CORS
from helper import pie_chart, map_chart, bar_chart, line_chart



app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route("/")
def home():
    """List all available api routes."""
    return (
        f"<b>Available Routes: </b> <br/>"
        f"/api/v1.0/pie<br/>"
        f"/api/v1.0/map <br/>"
        f"/api/v1.0/line <br/>"
        f"/api/v1.0/bar <br/>"
    )

@app.route('/pie')
def get_data():
    data = pie_chart()
    return jsonify(data)

@app.route('/map')
def get_data2():
     data = map_chart()
     return jsonify(data)

@app.route('/line')
def get_data3():
     data = line_chart()
     return jsonify(data)

@app.route('/bar')
def get_data4():
    data = bar_chart()
    return jsonify(data)

if __name__ == "__main__":
     app.run(debug=True)