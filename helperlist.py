import sqlalchemy as db
from flask import Flask, request, jsonify
from flask_cors import CORS


def pie_chart():
    engine = db.create_engine("sqlite:///project3.db")
    print(engine)

    conn = engine.connect()

    metadata = db.MetaData() #extracting the metadata
    data= db.Table('pie', metadata, autoload_with=engine) #Table object
    print(data.columns)

    query = data.select() #SELECT * FROM divisions

    exe = conn.execute(query) #executing the query
    result = exe.fetchall() 

    category = []
    neighbourhood = []
    period = []
    percentage = []

    for record in result:
        category.append(record[0])
        neighbourhood.append(record[1])
        period.append(record[2])
        percentage.append(record[3])
    return {
        'category': category,
        'neighbourhood': neighbourhood,
        'period': period,
        'percentage': percentage,
    }



def line_chart():
    engine = db.create_engine("sqlite:///project3.db")
    print(engine)

    conn = engine.connect()

    metadata = db.MetaData() #extracting the metadata
    data= db.Table('line', metadata, autoload_with=engine) #Table object
    print(data.columns)

    query = data.select() #SELECT * FROM divisions

    exe = conn.execute(query) #executing the query
    result = exe.fetchall() 

    year = []
    neighbourhood = []
    category = []
    total_offense = []

    for record in result:
        year.append(record[0])
        neighbourhood.append(record[1])
        category.append(record[2])
        total_offense.append(record[3])
       
    return {
        'year': year,
        'neighbourhood': neighbourhood,
        'category': category,
        'total_offense': total_offense,
    }



def map_chart():
    engine = db.create_engine("sqlite:///project3.db")
    print(engine)

    conn = engine.connect()

    metadata = db.MetaData() #extracting the metadata
    data= db.Table('map', metadata, autoload_with=engine) #Table object
    print(data.columns)

    query = data.select() #SELECT * FROM divisions

    exe = conn.execute(query) #executing the query
    result = exe.fetchall() 

    year = []
    neighbourhood = []
    category = []
    lat = []
    lng = []
    total_offense = []

    for record in result:
        year.append(record[0])
        neighbourhood.append(record[1])
        category.append(record[2])
        lat.append(record[3])
        lng.append(record[4])
        total_offense.append(record[5])
       
    return {
        'year': year,
        'neighbourhood': neighbourhood,
        'category': category,
        'lat': lat,
        'lng': lng,
        'total_offense': total_offense,
    }




def stacked_chart():
    engine = db.create_engine("sqlite:///project3.db")
    print(engine)

    conn = engine.connect()

    metadata = db.MetaData() #extracting the metadata
    data= db.Table('stacked', metadata, autoload_with=engine) #Table object
    print(data.columns)

    query = data.select() #SELECT * FROM divisions

    exe = conn.execute(query) #executing the query
    result = exe.fetchall() 

    year = []
    crime= []
    category = []
    total_offense = []

    for record in result:
        year.append(record[0])
        crime.append(record[1])
        category.append(record[2])
        total_offense.append(record[3])
       
    return {
        'year': year,
        'crime': crime,
        'category': category,
        'total_offense': total_offense,
    }


