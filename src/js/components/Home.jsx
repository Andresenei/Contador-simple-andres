import React, { useState, useEffect } from 'react';

function SecondsCounter({ seconds }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <i className="fas fa-clock me-2" style={{ fontSize: '2rem' }}></i>
      <h3>{seconds} segundos</h3>
    </div>
  );
}

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [targetTime, setTargetTime] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setSeconds(prev => prev + 1);
        if (isCountingDown && countdown !== null) {
          setCountdown(prev => prev - 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isCountingDown, countdown]);

  useEffect(() => {
    if (isCountingDown && countdown !== null && countdown <= 0) {
      alert('¡Se alcanzó el tiempo!');
      setIsCountingDown(false);
    }
  }, [countdown, isCountingDown]);

  const handleStartCountdown = () => {
    const time = parseInt(targetTime);
    if (!isNaN(time) && time > 0) {
      setCountdown(time);
      setIsCountingDown(true);
    }
  };

  const handleReset = () => {
    setSeconds(0);
    setCountdown(null);
    setIsCountingDown(false);
    setTargetTime('');
  };

  const handlePauseResume = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <div className="container my-4">
      <div className="mb-4 text-center">
        <SecondsCounter seconds={seconds} />
      </div>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary me-2" onClick={handlePauseResume}>
          {isPaused ? 'Resumir' : 'Pausar'}
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reiniciar
        </button>
      </div>
      <div className="card p-3 mx-auto" style={{ maxWidth: '400px' }}>
        <h4 className="card-title mb-3 text-center">Cuenta regresiva</h4>
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Segundos"
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
        />
        <button
          className="btn btn-danger mb-3 w-100"
          onClick={handleStartCountdown}
        >
          Iniciar cuenta regresiva
        </button>
        {isCountingDown && (
          <p className="text-center">Tiempo restante: {countdown} segundos</p>
        )}
      </div>
    </div>
  );
}
