# Import dependencies:

import numpy as np
import datetime as dt
# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///crime.sqlite") 
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save references to each table
crime = Base.classes
# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
# Create an app, being sure to pass __name__
app = Flask(__name__)

@app.route("/")
def home():
    """List all available api routes."""
    return (
        f"<b>Available Routes: </b> <br/>"
        f"/api/v1.0/cases <br/>"
    )

#Create API for all the stations in the dataset
@app.route("/api/v1.0/cases")
def cases():
    """Return a JSON list of cases from the dataset."""
    # Query all stations
    results = session.query(crime.CaseNumber).all()
    session.close()
    # Convert list of tuples into normal list
    all_cases = list(np.ravel(results))
    return jsonify(all_cases)

if __name__ == '__main__':
    app.run(debug=True)