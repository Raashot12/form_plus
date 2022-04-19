import React, {useState, useEffect} from "react"

// styles
import "./CustomSelect.scss"
type IProp = {
  optionsList: {
    defaultSelectText: string
    countryList: {
      id: string
      name: string
    }[]
  }
  label: string
  // handleOptionClick: (title: string) => void
}
const CustomSelected = (props: IProp) => {
  const [selectedCountryID, setSelectedCountryID] = useState("All")
  const [displayList, setDisplayList] = useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        wrapperRef?.current &&
        !wrapperRef?.current?.contains(event.target as Node)
      ) {
        setDisplayList(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  // This method handles the setting of name in select text area
  // and list display on selection
  const handleOptionClick = (id: any) => {
    setSelectedCountryID(id)
    setDisplayList(!displayList)
  }
  const storage = localStorage.getItem("sort")
  useEffect(() => {
    if (storage) {
      localStorage.setItem("sort", selectedCountryID)
    }
  }, [selectedCountryID, storage])
  const selectedCountry = props.optionsList.countryList.filter(
    (option: any) => option.id === selectedCountryID
  )[0]
  return (
    <div ref={wrapperRef} className="custom-select-container">
      <div
        role="button"
        tabIndex={0}
        className={displayList ? "selected-text-drop active" : "selected-text"}
        onClick={() => setDisplayList(prevState => !prevState)}
      >
        <p>{selectedCountry.name}</p>
      </div>
      {displayList && (
        <ul className="select-options">
          {props.optionsList.countryList
            .filter((v: any) => v.name !== selectedCountryID)
            .map((option: any) => {
              return (
                <li
                  className="custom-select-option"
                  data-name={option.name}
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                >
                  <p>{option.name}</p>
                </li>
              )
            })}
        </ul>
      )}
      <span className="sort-by-label">{props.label}</span>
    </div>
  )
}

export default CustomSelected
