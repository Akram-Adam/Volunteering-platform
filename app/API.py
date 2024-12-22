from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    
    CORS(app)  # Enable CORS to allow frontend to communicate with the backend

    # Register blueprints
    from app.views.user import user_bp
    app.register_blueprint(user_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)