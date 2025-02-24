from flask import Flask, jsonify

def register_error_handlers(app: Flask) -> None:
    """
    Registers standard error handlers for the application.

    Args
        app: flask application instance
    """
    # errors passed using abort(status_code, description)
    @app.errorhandler(400)
    def bad_request(error):
        response = {
            'status_code': 400,
            'message': 'Bad Request',
            'error': str(error)
        }
        return jsonify(response), 400

    @app.errorhandler(401)
    def unauthorized(error):
        response = {
            'status_code': 401,
            'message': 'Unauthorized',
            'error': str(error)
        }
        return jsonify(response), 401

    @app.errorhandler(403)
    def forbidden(error):
        response = {
            'status_code': 403,
            'message': 'Forbidden Request',
            'error': str(error)
        }
        return jsonify(response), 403

    @app.errorhandler(404)
    def not_found(error):
        response = {
            'status_code': 404,
            'message': 'Resource Not Found',
            'error': str(error)
        }
        return jsonify(response), 404

    # errors passed using raise(error)
    @app.errorhandler(500)
    def handle_exception(error):
        response = {
            'status_code': 500,
            'message': 'Internal Server Error',
            'error': str(error)
        }
        return jsonify(response), 500