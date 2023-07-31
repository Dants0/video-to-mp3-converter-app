import { useState, useEffect } from 'react';
import axios from 'axios';
import Ytb from './Ytb';


import './serverIntegration.css'
import { formatDate } from '../utils/formatDate';

const ServerInteraction = () => {
  const [urlYoutube, setUrlYoutube] = useState('');
  const [conversionStatus, setConversionStatus] = useState('');
  const [song, setSong] = useState([]);

  const handleInputChange = (e) => {
    setUrlYoutube(e.target.value);
  };

  const handleConvert = () => {
    axios.post('http://localhost:8000/convert', { url: urlYoutube })
      .then(response => {
        setConversionStatus(response.data.message);
        setSong(response.data.song);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='containerServer'>
      <div className='box_1'>
        <h1>Convert YTB</h1>
      </div>
      <div className='box_2'>
        <input
          type="text"
          placeholder='Url do Video'
          value={urlYoutube}
          onChange={handleInputChange}
          className='input_text'
        />
        <button className="send_btn_convert" onClick={handleConvert}>Converter para áudio</button>
        <p>Status da conversão: {conversionStatus}</p>
      <div className="box_3">
        <Ytb url={urlYoutube} songName={song.title} />
      </div>
        {
          conversionStatus ?
            <div className='informations_song'>
              <p>Nome da música: {song.title}</p>
              <p>Data de publicação: {formatDate(song.publish_date)}</p>
              <p>Autores: {song.author}</p>
              <p>Views: {song.views}</p>
              <a href={song.channel_url} target='_blank' rel="noreferrer">Créditos</a>
            </div>
            : ''
        }
      </div>
    </div>
  );
};

export default ServerInteraction;
