import ReactPlayer from 'react-player'

import './ytb.css'

const Ytb = (props) => {
  // eslint-disable-next-line react/prop-types
  const { url, songName } = props

  const handleDownload = () => {
    if (songName) {
      window.open(`http://localhost:8000/download/${songName}`, '_blank');
    }
  };


  return (
    <div className='container_video'>
      {url ?
        <>
          <ReactPlayer
            url={url}
            controls
            playing={false}
            width={800}
            height={400}
          />
          <button onClick={handleDownload} className='download_btn'>Baixar som</button>
        </>
        :
        ''}
    </div>
  )
}

export default Ytb