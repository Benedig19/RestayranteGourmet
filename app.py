from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os
import secrets

app = Flask(__name__)
app.config["SECRET_KEY"] = secrets.token_hex(32)
CORS(app, resources={r"/api/*": {"origins": "*"}})

DB_PATH = os.path.join(os.path.dirname(__file__), "gourmet_users.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    if os.path.exists(DB_PATH):
        return
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    conn.commit()
    conn.close()
    print("Base de datos SQLite3 creada: gourmet_users.db")


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or len(name) < 3:
        return jsonify({"error": "El nombre debe tener al menos 3 caracteres"}), 400
    if not email or "@" not in email:
        return jsonify({"error": "Correo electronico no valido"}), 400
    if not password or len(password) < 6:
        return jsonify({"error": "La contrasena debe tener al menos 6 caracteres"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
    if cursor.fetchone():
        conn.close()
        return jsonify({"error": "Ya existe una cuenta con este correo"}), 409

    password_hash = generate_password_hash(password, method="pbkdf2:sha256", salt_length=16)
    cursor.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        (name, email, password_hash)
    )
    conn.commit()
    user_id = cursor.lastrowid
    conn.close()

    return jsonify({
        "success": True,
        "message": "Cuenta creada exitosamente",
        "user_id": user_id
    }), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Correo y contrasena son requeridos"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, password_hash FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({"error": "Correo o contrasena incorrectos"}), 401

    if not check_password_hash(user["password_hash"], password):
        return jsonify({"error": "Correo o contrasena incorrectos"}), 401

    token = secrets.token_urlsafe(32)
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO sessions (user_id, token) VALUES (?, ?)", (user["id"], token))
    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "token": token,
        "user_id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "message": "Inicio de sesion exitoso"
    }), 200


@app.route("/api/me", methods=["GET"])
def me():
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    if not token:
        return jsonify({"error": "No autorizado"}), 401

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT u.id, u.name, u.email, u.created_at
        FROM users u
        JOIN sessions s ON u.id = s.user_id
        WHERE s.token = ?
    """, (token,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({"error": "Sesion no valida"}), 401

    return jsonify({
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "created_at": user["created_at"]
    }), 200


@app.route("/api/logout", methods=["POST"])
def logout():
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    if token:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
        conn.close()
    return jsonify({"success": True, "message": "Sesion cerrada"}), 200


@app.route("/api/users/count", methods=["GET"])
def users_count():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as total FROM users")
    count = cursor.fetchone()["total"]
    conn.close()
    return jsonify({"total_users": count}), 200


if __name__ == "__main__":
    init_db()
    print("Servidor Flask iniciado en http://localhost:5000")
    print("Base de datos: gourmet_users.db")
    app.run(debug=True, host="0.0.0.0", port=5000)