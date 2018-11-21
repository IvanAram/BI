import json
from bson import json_util
from app import app
from flask import jsonify, request
import datetime

@app.route('/sales/create', methods=["POST"])
def create_sale():
    data = json.loads(request.data.decode("utf-8"))
    query = {}
    query["_id"] = autoIncrement("sales")
    query["amount"] = data["amount"]
    query["total_cash"] = data["total_cash"]
    query["discount_percentage"] = data["discount_percentage"]
    query["sale_date"] = datetime.datetime(data["Y"],data["M"],data["D"])
    query["distributor"] = data["distributor"]
    query["product"] = data["product"]
    query["place"] = data["place"]
    app.mongo.db.sales.insert_one(query)
    return jsonify({"status": True})

@app.route('/sales/reset', methods=["POST"])
def reset_db():
    app.mongo.db.command("dropDatabase");
    return jsonify({"status": True})

def autoIncrement(collection):
    app.mongo.db.counters.update_one({"collection": collection}, {"$inc" : {"value": 1}}, upsert=True)
    counter = app.mongo.db.counters.find_one({"collection": collection})
    return int(counter["value"])

@app.route('/sales')
def get_sales():
    sales = app.mongo.db.sales.find().sort('sale_date', -1)
    sales = [doc for doc in sales]
    return jsonify(sales)

@app.route('/sales/<int:sale_id>')
def get_sale(sale_id):
    sale = app.mongo.db.sales.find_one({"_id":sale_id})
    return jsonify(sale)
