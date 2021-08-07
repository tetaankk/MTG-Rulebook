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
  const [subChapter, setSubChapter] = useState();
  const [toSearch, setToSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://magicrulebook.herokuapp.com/rules")
      .then((res) => setRules(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (e) => {
    setToSearch(e.target.value);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setToSearch("");
  };

  return (
    <div className="App">
      <Header text="Rulebook&nbsp;for&nbsp;Magic:&nbsp;The&nbsp;Gathering" />
      <div className="ruleBook">
        <div className="tableOfContents">
          {rules.length > 0 &&
            rules.map((chapter) => (
              <ul key={chapter.chapterKey}>
                <li>
                  <TableOfContents
                    chapter={chapter}
                    changeSubChapter={(subChapter) => {
                      setSubChapter(subChapter);
                      setToSearch("");
                    }}
                    subChapter={subChapter}
                    toSearch={toSearch}
                  />
                </li>
              </ul>
            ))}
        </div>
        <div className="rules">
          <SearchBar
            toSearch={toSearch}
            handleSearch={handleSearch}
            handleReset={handleReset}
          />
          {toSearch ? (
            <SearchFunction rules={rules} toSearch={toSearch} />
          ) : (
            subChapter && <Rules subChapter={subChapter} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
