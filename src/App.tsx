import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Layout, Menu, Breadcrumb, Icon } from "antd"
import UnderConstruction from "./UnderConstruction"

import RobBotCover from "../static/RobBot-Art/logo/profile.png"

const { Header, Content } = Layout

const App: React.FC = () => (
  <Layout>
    <Header className="header">
      <div className="logo">
        <img height="64px" src={RobBotCover} alt="RobBot Logo" />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: "64px" }}
      ></Menu>
    </Header>
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Router>
          <Switch>
            <Route>
              <UnderConstruction />
            </Route>
          </Switch>
        </Router>
      </Content>
    </Layout>
  </Layout>
)

export default App
