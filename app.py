from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Koneksi database
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Halaman utama
@app.route('/')
def index():
    return render_template('index.html')

# Halaman hasil prediksi
@app.route('/results')
def results():
    conn = get_db_connection()
    predictions = conn.execute('SELECT * FROM predictions').fetchall()
    conn.close()
    return render_template('results.html', predictions=predictions)

# API untuk menambahkan prediksi
@app.route('/add_prediction', methods=['POST'])
def add_prediction():
    data = request.json
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO predictions (image, disease, accuracy, date) VALUES (?, ?, ?, ?)',
        (data['image'], data['disease'], data['accuracy'], data['date'])
    )
    conn.commit()
    conn.close()
    return jsonify({'message': 'Prediction added successfully'})

if __name__ == '__main__':
    app.run(debug=True)
