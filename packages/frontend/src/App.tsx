import React from 'react';
import { createBlogEntry, TBlogEntry } from "./lib/lambda"
import './App.css';

function App() {
  const [title, setTitle] = React.useState('title');
  const [description, setDescription] = React.useState('description');

  const handleSubmit = async () => {
    // Generate a unique ID for the blog entry
    // This could be improved with a more robust ID generation method
    const id = Date.now().toString();

    const blogEntry: TBlogEntry = {
      id,
      title,
      description
    };

    console.log("blogEntry is ------------------------------------------ ", blogEntry)

    try {
      const result = await createBlogEntry(blogEntry);
      console.log('Blog entry created:', result);
      // Optionally reset title and description or navigate to another page
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating blog entry:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple blog</h1>
        <h2>Enter data</h2>
        <div>
        <div>
          <label htmlFor="title"><span>Title</span>
          <input type="text" value={title} onChange={(e) => {
            setTitle(e.target.value);
          }} />
          </label>
        </div>
        <div>
          <label htmlFor="title"><span>Description</span>
          <textarea  value={description} onChange={(e) => {
            setDescription(e.target.value);
          }}  />
          </label>
        </div>
        <div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>

        </div>
      </header>
    </div>
  );
}

export default App;
