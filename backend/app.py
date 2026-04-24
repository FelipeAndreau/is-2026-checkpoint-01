from flask import Flask, jsonify
import psycopg2
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():

    return psycopg2.connect(
        host='database',
        database=os.getenv('POSTGRES_DB'),
        user=os.getenv('POSTGRES_USER'),
        password=os.getenv('POSTGRES_PASSWORD')
    )

@app.route('/api/health')
def health():

    return jsonify({"status": "healthy"}), 200

@app.route('/api/info')
def info():
    return jsonify({
        "service": "TeamBoard Backend",
        "version": "1.0.0",
        "developer": "Felipe Andreau - 33294"
    })

@app.route('/api/team')
def get_team():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT name, legajo, feature, servicio, status FROM members;')
        members = cur.fetchall()
        cur.close()
        conn.close()        
        team = [{"name": m[0], "legajo": m[1], "feature": m[2], "servicio": m[3], "status": m[4]} for m in members]
        return jsonify(team)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
