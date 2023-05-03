from flask import Flask, request, jsonify, render_template
import ast
import diploma as dp
from sympy import *
import json
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_par", methods=['POST','GET'])
def get_par():
    print(request.form["paral"])
    elements = ast.literal_eval(request.form["paral"])
    print(elements)
    elements = dp.parallelStress(elements)
    
    return jsonify({'elements': elements})
@app.route("/get_ser", methods=['POST','GET'])
def get_ser():
    elements = ast.literal_eval(request.form["serial"])
    
    dp.serialStress(elements,elements)
    f = open("res.conf")
    string = f.read()

    elements = ast.literal_eval(string)
    print(elements)
    return jsonify({'elements': elements})
@app.route("/analyze",methods=['POST','GET'])
def analyze():
    input1 = request.form["sigma"]
    input2 = request.form["eps"]
    res = request.form["res"]
    print(input1, input2)
    if(input2 != ""):
        obj = dp.calculateSigma(res, "x(t)", input2)
    elif(input1 != ""):
        obj = dp.calculateEps(res, "sigma(t)", input1)
    else:
        pass
    print(obj)
    return jsonify({'eq': str(obj["eq"]), 'x_s': json.dumps([str(s) for s in obj["x"]]), "sigmas": json.dumps([str(s) for s in obj["s"]]), "t":json.dumps([str(t) for t in obj["t"]])})

if __name__ == "__main__":
    app.run(debug=True)