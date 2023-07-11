import React, { useState } from 'react';
import axios from 'axios';

function FormInput({username, handleSubmit, handleChange}){

  return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Enter Github username"
      value={username}
      onChange={handleChange}
    />
    <button type="submit">Search</button>
</form>
  );
}
function App() {
  const [username, setUsername] = useState('');
  const [contributes, setContributes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = event => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setContributes(response.data);
    } catch (error) {
      console.error('Error fetching contributed repositories:', error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Github User Displayer</h1>
      <FormInput username={username} handleSubmit={handleSubmit} handleChange={handleChange} />
      {isLoading ? (
        <p>Wait while we are fetching the results...</p>
      ) : (
        <ul>
          {contributes.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;