import React, { useState, useEffect } from 'react';
import axios from 'axios'; //библиотека для получения данных с сервера.
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]); //массив персов
  const [searchTerm, setSearchTerm] = useState(''); //текст для поиска
  const [statusFilter, setStatusFilter] = useState('all');
  const [isHovered, setIsHovered] = useState(false); // состояние для отслеживания наведения мыши

  useEffect(() => {
    const fetchCharacters = async () => { //функция, данные с айпишки
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchCharacters();
  }, []);



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredCharacters = characters.filter(character => {
    const matchesName = character.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || character.status.toLowerCase() === statusFilter;

    return matchesName && matchesStatus;   //персонажи, которые соответствуют введенному имени и выбранному статусу
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1 
          onMouseEnter={() => setIsHovered(true)} // установка состояния при наведении
          onMouseLeave={() => setIsHovered(false)} // сброс состояния
          style={{
            color: isHovered ? 'blue' : 'white', //смена цвета
            transition: 'color 0.3s ease', //переходик!!!
          }}
        >
          {isHovered ? 'Персонажи из Рика и Морти' : 'Rick and Morty Characters'}
        </h1>
        
        <input
          type="text"
          placeholder="Поиск персонажа..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <div className="status-filter">
          <label>
            <input
              type="radio"
              value="all"
              checked={statusFilter === 'all'}
              onChange={handleStatusChange}
            />
            Все
          </label>
          <label>
            <input
              type="radio"
              value="alive"
              checked={statusFilter === 'alive'}
              onChange={handleStatusChange}
            />
            Alive
          </label>
          <label>
            <input
              type="radio"
              value="dead"
              checked={statusFilter === 'dead'}
              onChange={handleStatusChange}
            />
            Dead
          </label>
        </div>

        <div className="character-list">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map(character => (
              <div key={character.id} className="character-card">
                <img src={character.image} alt={character.name} />
                <h2>{character.name}</h2>
                <p>{character.status}</p>
              </div>
            ))
          ) : (
            <p>Персонажи не найдены.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
