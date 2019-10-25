import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHardHat } from "@fortawesome/free-solid-svg-icons"
import { Typography } from "antd"

const UnderConstruction: React.FC = () => {
  return (
    <>
      <Typography.Title level={1}>
        Under Construction <FontAwesomeIcon icon={faHardHat} />
      </Typography.Title>
    </>
  )
}

export default UnderConstruction
