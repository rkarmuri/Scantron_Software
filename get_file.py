from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
from flask import jsonify, request

app = Flask(__name__)
app.secret_key = "1n1t1al0!"
app.debug = True

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

TEMP_PATH = "./Assets/Temp/temporary.pdf"

def allowed_file_extensions():
    """allowed file extensions"""
    return {'csv','pdf'}

@app.route("/upload_file", methods=["POST"])
@cross_origin()
def upload_file():
    """handling file upload"""
    delete_file(TEMP_PATH)

    file_upload = file_handling(TEMP_PATH)

    if file_upload is False:
        return jsonify({'success': 'False'})

    return file_upload

def file_handling(temp_path):
    """processes the file submission"""
    if 'file' not in request.files:
        return False

    file = request.files['file']

    if file.filename == '':
        return False

    if file and allowed_file(file.filename):
        file.save(temp_path)
        return jsonify({'success': 'True'})

    return False

def allowed_file(filename):
    """Determines the file submitted has an accepted extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_file_extensions()

def delete_file(file_path):
    """helps with file path deletion"""
    if os.path.exists(file_path):
        os.remove(file_path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)