import React from 'react';
import { Navbar, Nav, NavItem, Col, Grid, Row } from 'react-bootstrap';
import './Main.css';
import Item from './../../components/Item.js';

export default class Main extends React.Component {

  render() {
    let {Items, Comments} = this.props;
    Items = [];
    Comments = [];
    return (
      <Grid>
        <Row className='show-grid'>
          <Col xs={2} sm={2} md={2} >
            <h1>Main</h1>
            <Navbar>
              <Nav>
                <NavItem>Overview</NavItem>
              </Nav>
            </Navbar>
          </Col>
          <Col xs={10} sm={10} md={10}>
            <Item Items = {Items} Comments = {Comments} />
          </Col>
        </Row>
      </Grid>
      );
  }
}
