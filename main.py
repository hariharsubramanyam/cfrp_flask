import os
from flask import Flask, url_for, render_template, request, redirect
import json
import requests

app = Flask(__name__)

author_data = json.loads(open("./static/data/authors_with_year.json").read())

author_dict = {}

for author in author_data:
    author_dict[author["name"]] = author

def get_play_data(name):
    try:
        url_path = "http://cfrp-api.herokuapp.com/plays?author=eq." + name
        r = requests.get(url_path)
        play_data = json.loads(r.text)
        return play_data
    except:
        return None

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
            play_data = get_play_data(author)
            return render_template("author.html", author=author_dict[author], play_data=play_data)
    return redirect(url_for("root"))

# Route for static files.
@app.route('/<path:path>')
def static_proxy(path):
  return app.send_static_file(path)

if __name__ == "__main__":
    app.run()
