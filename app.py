from flask import Flask, render_template, request, redirect # Flask (class); future work will use request/redirect
app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/portfolio')
def portfolio():
    return render_template("portfolio.html")

@app.route('/articles')
def articles():
    return render_template("articles.html")

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')
