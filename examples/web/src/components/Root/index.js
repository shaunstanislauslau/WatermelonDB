import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { generate100, generate10k } from 'models/generate'

import Button from 'components/Button'
import BlogList from 'components/BlogList'
import Post from 'components/Post'
import Blog from 'components/Blog'
import ModerationQueue from 'components/ModerationQueue'

import style from './style'

class Root extends Component {
  state = { isGenerating: false }

  generateWith = async generator => {
    this.setState({ isGenerating: true })

    const count = await generator(this.props.database)

    alert(`Generated ${count} records!`)

    this.setState({ isGenerating: false })
  }

  generate100 = () => this.generateWith(generate100)

  generate10k = () => this.generateWith(generate10k)

  render() {
    const { database } = this.props
    return (
      <Router>
        <div className={style.root}>
          <div className={style.header}>
            <Button title="Generate 100 records" onClick={this.generate100} />
            <Button title="Generate 10,000 records" onClick={this.generate10k} />
          </div>
          <div className={style.content}>
            <div className={style.sidebar}>
              {!this.state.isGenerating && <BlogList database={database} />}
            </div>
            <Route path="/blog/:blogId"
              render={props => (
                <div className={style.sidebar}>
                  <Blog key={props.match.params.blogId} database={database} {...props} />
                </div>
              )} />
            <div className={style.main}>
              <Switch>
                <Route path="/blog/:blogId/nasty"
                  render={props => <ModerationQueue database={database} {...props} />} />
                <Route path="/blog/:blogId/post/:postId"
                  render={props => <Post database={database} {...props} />} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default Root
