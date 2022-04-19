import React from "react"
import TemplateCard from "./TemplateCard"

interface IProps {
  data: {
    description: string
    link: string
    name: string
  }[]
}

const TemplateParent = ({data}: IProps) => {
  return (
    <>
      <div className="grid-wrapper">
        {data.map(({description, link, name}, index) => {
          return (
            <TemplateCard
              description={description}
              name={name}
              link={link}
              key={index}
            />
          )
        })}
      </div>
    </>
  )
}

export default TemplateParent
