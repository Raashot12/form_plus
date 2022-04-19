import React, {useState, useLayoutEffect, useRef, useEffect} from "react"
import "./App.css"
import Header from "./components/Header"
import Alert from "./components/Alert"
import TemplateParent from "./components/TemplateParent"
import Headline from "./components/Headline"
import Spinner from "react-spinkit"

function App() {
  const [posts, setPosts] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scrollable, setScrollable] = useState<number>(0)
  const [search, setNewSearch] = useState<string>("")
  const ref = useRef<HTMLDivElement>(null)
  // const paginatedPosts = [...posts]
  const scrollablePixel = (e: any) => {
    setScrollable(e.target.scrollTop)
  }
  const scrollNext = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollTop + 158
      setPageNumber(prev => ++prev)
    }
  }
  const scrollPrev = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollTop - 158
      setPageNumber(prev => {
        if (prev === 1) {
          return 1
        } else {
          return --prev
        }
      })
    }
  }

  useLayoutEffect(() => {
    setLoading(true)
    fetch(
      "https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates"
    )
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (ref.current) {
      if (scrollable < ref.current?.scrollTop) {
        setPageNumber(prev => ++prev)
      } else if (scrollable > ref.current.scrollTop) {
        setPageNumber(prev => {
          if (prev === 1) {
            return 1
          } else {
            return --prev
          }
        })
      }
    }
  }, [scrollable])
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSearch(e.target.value)
  }

  // const st = localStorage.getItem("sort") || ""

  const filtered = !search
    ? posts
    : posts.filter(
        (value: {
          description: string
          link: string
          name: string
          category: [string]
        }) => {
          return value.description.toLowerCase().includes(search.toLowerCase())
        }
      )

  return (
    <main className="MuiContainer-maxWidthLg MuiContainer-root">
      <Header searchterm={search} handleSearchChange={handleSearchChange} />
      <Alert />
      <Headline templates={filtered} />
      <>
        {!loading ? (
          <div>
            <div
              className="content-paginated-container"
              ref={ref}
              onScroll={scrollablePixel}
            >
              <TemplateParent data={filtered} />
            </div>
            <div className="pagination-container">
              <button onClick={scrollPrev}>Previous</button>
              <span className="pagination-section">
                <span className="current-page">{pageNumber}</span> of{" "}
                {Math.ceil(filtered.length / 20)}
              </span>
              <button onClick={scrollNext}>Next</button>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="spinner-container"
          >
            <Spinner name="circle" className="spinner" />
          </div>
        )}
      </>
    </main>
  )
}

export default App
