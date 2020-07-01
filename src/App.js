import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  //Inicializa o array de repos e define a função setRepositories para alterar seu valor
  const [repositories, setRepositories] = useState([]);

  //Ao iniciar a aplicação, faz a requisição à api com os repositórios
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: `http://github.com/${Date.now()}`,
      techs: []
    })

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const updt_repos = repositories.filter(repository => {
        return (repository.id !== id);
      })
      setRepositories(updt_repos);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        }
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
