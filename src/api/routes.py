"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)

@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()
    
    if body is None or "email" not in body or "password" not in body:
        return jsonify({"msg": "Email and password are required"}), 400

    user_exists = User.query.filter_by(email=body['email']).first()
    if user_exists:
        return jsonify({"msg": "User already exists"}), 400
    
    new_user = User(email=body['email'], password=body['password'], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    
    if body is None or "email" not in body or "password" not in body:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=body['email']).first()
    
    if user is None or user.password != body['password']:
        return jsonify({"msg": "Invalid email or password"}), 401
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"msg": f"Welcome back {user.email}!", "user": user.serialize()}), 200

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"message": "Hello from backend!"}), 200