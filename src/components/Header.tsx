import React, {useRef,useEffect} from "react"
import CustomSelected from "../CustomSelect"
import SearchIcon from "../icons/SearchIcon"

interface IProps {
  searchterm: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const Header: React.FC<IProps> = props => {
  const inputRef = useRef<HTMLInputElement>(null)
  const category = {
    defaultSelectText: "Please select an option",
    countryList: [
      {id: "All", name: "All"},
      {id: "Health", name: "Health"},
      {id: "E-commerce", name: "E-commerce"},
      {id: "Education", name: "Education"},
    ],
  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])
  return (
    <div className="header-container">
      <div className="input-container">
        <input
          type="search"
          placeholder="Search Templates"
          className="search-input"
          ref={inputRef}
          onChange={props.handleSearchChange}
          value={props.searchterm}
        />
        <div className="search-icon-container">
          <SearchIcon />
        </div>
      </div>
      <div className="sort-by-container">
        <span className="sort-by">Sort By:</span>
        <div className="sort-element">
          <CustomSelected
            optionsList={category}
            label="Category"
          />
        </div>
        <div className="sort-element">
          <CustomSelected
            optionsList={category}
            label="Order"
          />
        </div>
        <div className="sort-element">
          <CustomSelected
            optionsList={category}
            label="Date"
       
          />
        </div>
      </div>
    </div>
  )
}

export default Header
