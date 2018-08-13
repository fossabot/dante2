import React from 'react'
import { theme, ThemeConfig, DocPreview } from 'docz'
import { ThemeProvider } from 'emotion-theming'

import Dante from '../editor/components/Dante'
import 'bulma/css/bulma.css'
import Prism from 'prismjs';

import {Readme as demo} from '../site/data/poc'
import {License as license} from '../site/data/poc'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import '../site/styles/layout/layout.scss'
import '../site/styles/layout/normalize.scss'
import '../site/styles/layout/scaffold.scss'
import editorLogo from '../images/site/dante-editor-logo.png'
import githubLogo from '../images/site/github-logo.png'
import {version} from '../../package.json'
import styled from 'react-emotion'
import {Table} from './table'
import Menu from './sidebar'

const urlFor = (path)=>{
  return process.env.PUBLIC_URL + path
}

const isActive = (url)=>{
  return url === document.location.pathname ? 'is-active' : ''
}

const Theme = () => (
  <div>
    <Router>
      <div> 
        <Header/>
        <Route exact path={urlFor('')} component={Demo} />
        <Route path={urlFor('license')} component={License} />
        <Route path={urlFor('docs')} component={Doc} />
        <Route path={urlFor('src-index')} component={Doc} />
      </div>                
    </Router>
  </div>

)

const Header = ()=>{
  return  <nav id="header" className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link className="navbar-item" to={urlFor('')}>
                <img src={editorLogo} alt="dante editor" height="21"/>

              </Link>

              <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>

              <span>Dante Editor - {version} </span>
            </div>


            <div className="navbar-menu">
              <div className="navbar-start">
                <Link to={urlFor('src-index')} className={`navbar-item ${isActive('/src-index')}`}>
                  Documentation & examples
                </Link>
                <Link to={urlFor('license')} className={`navbar-item ${isActive('/license')}`}>
                  License
                </Link>
              </div>                

              <div className="navbar-end">


                <a href="https://github.com/michelson/dante2" 
                  className="navbar-item" 
                  data-tooltip="Fork me on github" 
                  target="_blank">
                  <img src={githubLogo} alt="Fork me on github" height="28"/>
                </a>

              </div>
            </div>

          </nav>

}

const License = ()=>{
  return <Dante content={license} style={{
                  margin: '0 auto',
                  width: '60%',
                  padding: '100px 0px'
                }} config={{read_only: true}}
              />
}

const Demo = ()=>{
  return <Dante content={demo} style={{
                  margin: '0 auto',
                  width: '60%',
                  padding: '100px 0px'
                }} config={{read_only: false}}
              />
}



const Pre = styled('pre')`
  font-size: 14px;
  font-family: monospace;

`
const Code = styled('pre')`
  background-color: #2d2d2d;
  color: #654f53;
  font-size: 1.2em;
  font-weight: normal;
  padding: 1.2em;
  width: 100%;
  display: block;
  font-family: monospace !important;
`

const H2 = styled('h2')`
  font-size: 1.6em;
`

const Playground = styled('div')`
  padding: 2em;
  border:1px solid #ccc;
  margin-bottom: 20px;
  margin-top: 20px;
`

class Render extends React.Component {
  render(){
    const fmt =  {__html: Prism.highlight(
                            this.props.code, 
                            Prism.languages.jsx, 
                            'jsx')
                  }
    return <div>
              <Playground>
                {this.props.component}
              </Playground>

              <Code dangerouslySetInnerHTML={fmt}/>
              
           </div>
  }
}


const Doc = ()=>{
  return <div className="container" 
              style={{padding: '100px 0px'}}>
            <section className="section">
              <h1 className="title">Documentation</h1>
              <h2 className="subtitle">
                Examples of Dante 2 editor 
              </h2>

              <ThemeConfig>
                {config => (
                  <ThemeProvider theme={config}>
                    <div className="columns is-mobile">
                      <div className="column is-two-quarters-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
                        <Menu />
                      </div>
                      <div className="column">

                        <DocPreview
                          
                          components={{
                            //page: components.Page,
                            //notFound: components.NotFound,
                            render: Render,
                            //h1: components.H1,
                            h2: H2,
                            //h3: components.H3,
                            //h4: components.H4,
                            //h5: components.H5,
                            //h6: components.H6,
                            //ul: components.List,
                            //loading: components.Loading,
                            table: Table,
                            //pre: Pre,
                            inlineCode: Code,
                          }}
                        />

                      </div>
                    </div>
                  </ThemeProvider>
                )}
              </ThemeConfig>
            </section>
          </div>
}

const themeConfig = {
  colors: {
    primary: 'danty',
    secondary: 'khaki',
    gray: 'lightslategray',
  },
}

export default theme(themeConfig)(Theme)