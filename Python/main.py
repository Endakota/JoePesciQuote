from flask import Flask, request, jsonify, render_template
import ast
import diploma as dp
from sympy import *
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
# @app.route("/get_arr",methods=['POST','GET'])
# def get_arr():
#     print(request.form)
#     elements = ast.literal_eval(request.form["array"])
    
#     elements = dp.splitArr(elements)
#     print(elements)
#     return jsonify({'elements': elements})
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
    # eq = Eq(parse_expr(res.split("=")[0]),parse_expr(res.split("=")[1]))
    if(input1 != ""):
        res = res.replace(res.split("=")[0], input1)
        eq = Eq(parse_expr(res.split("=")[0]), parse_expr(res.split("=")[1]))
    elif(input2 != ""):
        pass
    else:
        pass
    return jsonify({'eq': str(eq)})

if __name__ == "__main__":
    app.run(debug=True)