import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function SearchBar({ toSearch, handleSearch, handleReset }) {
  return (
    <form className="searchBar">
      <input
        className="searchBar-input"
        type="text"
        placeholder="Start typing to search for a rule..."
        value={toSearch}
        onChange={handleSearch}
      />
      <button className="searchBar-button" onClick={handleReset}>
        <HighlightOffIcon />
      </button>
    </form>
  );
}
