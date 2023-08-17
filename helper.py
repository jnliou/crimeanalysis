import sqlalchemy as db
from flask import Flask, request, jsonify
from flask_cors import CORS


def pie_chart():
    engine = db.create_engine("sqlite:///project3.db")
    print(engine)

    conn = engine.connect()

    metadata = db.MetaData()  # extracting the metadata
    data = db.Table('pie', metadata, autoload_with=engine)  # Table object
    print(data.columns)

    query = data.select()  # SELECT * FROM divisions

    exe = conn.execute(query)  # executing the query
    result = exe.fetchall()

    data_list = []

    for record in result:
        data_dict = {
            'category': record[0],
            'neighbourhood': record[1],
            'period': record[2],
            'count': record[3],
            'percentage': record[4],
        }
        data_list.append(data_dict)

    return data_list

def line_chart():
    engine = db.create_engine("sqlite:///project3.db")
    print(engine)

    conn = engine.connect()

    metadata = db.MetaData()  # extracting the metadata
    data = db.Table('line', metadata, autoload_with=engine)  # Table object
    print(data.columns)

    query = data.select()  # SELECT * FROM divisions

    exe = conn.execute(query)  # executing the query
    result = exe.fetchall()

    data_list = []

    for record in result:
        data_dict = {
            'year': record[0],
            'neighbourhood': record[1],
            'category': record[2],
            'total_offense': record[3],
        }
        data_list.append(data_dict)

    return data_list


def map_chart():
    engine = db.create_engine("sqlite:///project3.db")
    print(engine)

    conn = engine.connect()

    metadata = db.MetaData()  # extracting the metadata
    data = db.Table('map', metadata, autoload_with=engine)  # Table object
    print(data.columns)

    query = data.select()  # SELECT * FROM divisions

    exe = conn.execute(query)  # executing the query
    result = exe.fetchall()

    data_list = []

    for record in result:
        data_dict = {
            'year': record[0],
            'neighbourhood': record[1],
            'category': record[2],
            'lat': record[3],
            'lng': record[4],
            'total_offense': record[5],
        }
        data_list.append(data_dict)

    return data_list

def stacked_chart():
    engine = db.create_engine("sqlite:///project3.db")
    print(engine)

    conn = engine.connect()

    metadata = db.MetaData()  # extracting the metadata
    data = db.Table('stacked', metadata, autoload_with=engine)  # Table object
    print(data.columns)

    query = data.select()  # SELECT * FROM divisions

    exe = conn.execute(query)  # executing the query
    result = exe.fetchall()

    data_list = []

    for record in result:
        data_dict = {
            'year': record[0],
            'crime': record[1],
            'category': record[2],
            'total_offense': record[3],
        }
        data_list.append(data_dict)

    return data_list

