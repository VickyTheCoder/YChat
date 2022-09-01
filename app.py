from flask import Flask, redirect
from flask import request, redirect
from flask import render_template
from flask_restful import Api, Resource

import sqlite3

def db_prep():
    table1 = "CREATE TABLE IF NOT EXISTS Users(Username TEXT PRIMARY KEY, Password TEXT, Mobile TEXT)"
    db = sqlite3.connect("db.sqlite")
    cur = db.cursor()
    cur.execute(table1)

    table2 = "CREATE TABLE IF NOT EXISTS ChatRooms(GroupId INTEGER PRIMARY KEY, GroupName TEXT, Descrition TEXT)"
    insert = """INSERT or IGNORE INTO ChatRooms VALUES
        (1001, 'CRICKET', 'Sports Category'),
        (1002, 'STOCKS', 'Finance Category'),
        (1003, 'TV', 'Media Category')"""
    cur.execute(table2)
    cur.execute(insert)
    db.commit()
    cur.close()
    db.close()

app = Flask(__name__)
api = Api(app)
db = db_prep()

@app.route('/')
@app.route('/join')
def register(): 
    return render_template('index.html')

@app.route('/work_in_progress')
def work_in_progress():
    return render_template('wip.html')

class User(Resource):
    def post(self):
        username = request.form.get("username")
        password = request.form.get("password")
        mobile = request.form.get("mobile")
        db = sqlite3.connect('db.sqlite')
        query = f'SELECT * FROM Users WHERE Username="{username}"'
        cursor = db.cursor()
        status = cursor.execute(query).fetchone()
        print(query, status, 11111)
        if not status:
            query = f"INSERT INTO Users VALUES('{username}', '{password}', '{mobile}')"
            cursor.execute(query)
            db.commit()
            status = "Account Created"
        else:
            status = f"{username} is unavailable"
        return {'status': status}

class Authenticate(Resource):
    def post(self):
        username = request.form.get("username")
        password = request.form.get("password")
        db = sqlite3.connect('db.sqlite')
        query = f'SELECT * FROM Users WHERE Username="{username}" and Password="{password}"'
        cursor = db.cursor()
        status = cursor.execute(query).fetchone()
        print(query, status, 11111)
        return {"status": bool(status)}

class ChatRooms(Resource):
    def get(self):
        db = sqlite3.connect("db.sqlite")
        cur = db.cursor()
        query = "SELECT * FROM ChatRooms"
        chatrooms = cur.execute(query).fetchall()   
        if chatrooms:
            return {'chatrooms': chatrooms} 

class ChatRoom(Resource):
    def get(self, chatroom_number):
        return redirect("/work_in_progress")

api.add_resource(User, "/join")
api.add_resource(Authenticate, "/login")
api.add_resource(ChatRooms, "/getChatRooms")
api.add_resource(ChatRoom, "/chatroom/<int:chatroom_number>")

if __name__ == '__main__':
    app.run(debug=True)