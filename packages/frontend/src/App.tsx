import React, { useEffect, FC } from "react";
import { createBlogEntry, TBlogEntry, getBlogEntries } from "./lib/lambda";
import "./App.css";

const Entries: FC<{ entries: TBlogEntry[] }> = ({ entries }) => {
  return (
    <div className="container list-data">
      {entries.map((entry) => (
        <div key={entry.id} className="box">
          <div>
            <label>Title</label>
            <span>{entry.title}</span>
          </div>
          <div>
            <label>Description</label>
            <span>{entry.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [title, setTitle] = React.useState("title");
  const [description, setDescription] = React.useState("description");
  const [entries, setEntries] = React.useState([] as TBlogEntry[]);
  const [updateEntries, setUpdateEntries] = React.useState(true);

  const handleSubmit = async () => {
    // Generate a unique ID for the blog entry
    // This could be improved with a more robust ID generation method
    const id = Date.now().toString();

    const blogEntry: TBlogEntry = {
      id,
      title,
      description,
    };

    try {
      const result = await createBlogEntry(blogEntry);
      console.log("Blog entry created:", result);
      // Optionally reset title and description or navigate to another page
      setTitle("");
      setDescription("");
      setUpdateEntries(true);
    } catch (error) {
      console.error("Error creating blog entry:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBlogEntries();
      if (result) setEntries(result);
    };
    if (updateEntries) {
      setUpdateEntries(false)
      fetchData();
    }
  }, [updateEntries, setUpdateEntries]);

  return (
    <div className="App">
      <div>
        <h1>Simple blog</h1>

        <h2>Enter data</h2>
        <div className="container enter-data">
          <div>
            <label htmlFor="title">
              <span>Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label htmlFor="title">
              <span>Description</span>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Entries entries={entries} />
    </div>
  );
}

export default App;
