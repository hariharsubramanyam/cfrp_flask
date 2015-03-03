import os
from flask import Flask, url_for, render_template

app = Flask(__name__)

# Route for main page. 
@app.route('/')
def root():
  return render_template('index.html')

# Route for static files.
@app.route('/<path:path>')
def static_proxy(path):
  return app.send_static_file(path)

if __name__ == "__main__":
    app.run()
