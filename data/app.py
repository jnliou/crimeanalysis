from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

app = Flask(__name__)

# Connect to the database
engine = create_engine("sqlite:////crime.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)  # Reflect the tables

for table_name in Base.classes.keys():
    print("Reflected Table Name:", table_name)

# Choose the table you want to work with 
TableClass = Base.classes.data
session = Session(engine)

@app.route("/api/v1.0/data")
def get_all_data():
    try:
        # Query all rows from the table
        results = session.query(TableClass).all()

        # Create a list of dictionaries containing the data
        data = []
        for row in results:
            data_item = {}
            for column in TableClass.__table__.columns:
                data_item[column.name] = getattr(row, column.name)
            data.append(data_item)

        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)