import os
from flask import Flask, url_for, render_template, request, redirect
import json
import requests

app = Flask(__name__)

author_data = json.loads(open("./static/data/authors_with_year.json").read())

author_dict = {}

for author in author_data:
    author_dict[author["name"]] = author

def number_of_performances(name):
    data = author_dict[name]
    num_perf = -1
    for n in [name] + data["other_names"]:
        try:
            url_path = "http://cfrp-api.herokuapp.com/performances?author=eq." + n
            r = requests.get(url_path)
            r.headers['Range-Unit'] = 'items'
            r.headers['Range'] = '0-10000'
            perfs = json.loads(r.text)
            num_perf += len(perfs)
        except:
            pass
    return num_perf 

def get_play_titles(name):
    data = author_dict[name]
    titles = set()
    for n in [name] + data["other_names"]:
        try:
            url_path = "http://cfrp-api.herokuapp.com/plays?author=eq." + n
            r = requests.get(url_path)
            plays = json.loads(r.text)
            for play in plays:
                titles.add(play["title"])
        except:
            pass
    titles = list(titles)
    titles.sort()
    return titles

# Route for main page. 
@app.route('/')
def root():
    return render_template('index.html')

@app.route("/author", methods=["POST"])
def author():
    AUTHOR_NAME = "authorName"
    if AUTHOR_NAME in request.form:
        author = request.form[AUTHOR_NAME]
        if author in author_dict:
            titles = get_play_titles(author)
            num_perf = number_of_performances(author)
            return render_template("author.html", author=author_dict[author], titles=titles, num_performances=num_perf)
    return redirect(url_for("root"))

# Route for static files.
@app.route('/<path:path>')
def static_proxy(path):
    return app.send_static_file(path)

if __name__ == "__main__":
    app.run()
