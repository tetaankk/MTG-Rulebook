import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import TableOfContents from "./components/TableOfContents";
import Rules from "./components/Rules";
import SearchFunction from "./components/SearchFunction";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [rules, setRules] = useState([]);
  const [toSearch, setToSearch] = useState("");
  const [currentSubChapter, setCurrentSubChapter] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/rules")
      .then((res) => setRules(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (event) => {
    setToSearch(event.target.value);
  };

  const handleEmptySearch = (event) => {
    setToSearch("");
  };

  const handleReset = (event) => {
    event.preventDefault();
    setToSearch("");
  };

  const handleSubChapterChange = (subChapter) => {
    setCurrentSubChapter(subChapter);
    setToSearch("");
  };

  return (
    <div className="App">
      <Header text="Rulebook&nbsp;for&nbsp;Magic:&nbsp;The&nbsp;Gathering" />
      <div className="ruleBook">
        <TableOfContents
          rules={rules}
          handleEmptySearch={handleEmptySearch}
          handleSubChapterChange={handleSubChapterChange}
          currentSubChapter={currentSubChapter}
        />
        <div className="rules">
          <SearchBar
            toSearch={toSearch}
            handleSearch={handleSearch}
            handleReset={handleReset}
          />
          {toSearch ? (
            <SearchFunction rules={rules} toSearch={toSearch} />
          ) : (
            currentSubChapter && <Rules subChapter={currentSubChapter} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
