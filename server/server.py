from flask import Flask, request, jsonify, send_file
from pytube import YouTube
from flask_cors import CORS
from urllib.parse import unquote

import os

app = Flask(__name__)
CORS(app) 

@app.route('/')
def hello():
    response = "Server Online!"
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    return response, 200, headers

@app.route('/convert', methods=['POST'])
def convert_youtube_to_audio():
    try:
        data = request.get_json()
        youtube_url = data['url']
        output_folder = 'musicas'
        yt = YouTube(youtube_url)
        video = yt.streams.filter(only_audio=True).first()
        out_file = video.download(output_path=output_folder)
        base, ext = os.path.splitext(out_file)
        new_file = base + '.mp3'
        os.rename(out_file, new_file)
        print(yt.title + " has been successfully converted to audio.")
        response_data = {'message': 'Conversão feita com sucesso', 'song': {'title': yt.title, 'views': yt.views, 'author': yt.author, 'channel_url': yt.channel_url, 'publish_date': yt.publish_date, 'rating': yt.rating}}
        return jsonify(response_data), 200
    except Exception as e:
        response_data = {'message': 'Conversão falhou', 'reasons': e}
        return jsonify(response_data), 500


@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        decoded_filename = unquote(filename)
        file_path = f'musicas/{decoded_filename}.mp3'
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        response_data = {'message': 'Download failed'}
        return jsonify(response_data), 500

if __name__ == '__main__':
    app.run(host='localhost', port=8000)
