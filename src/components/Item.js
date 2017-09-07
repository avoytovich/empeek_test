import React from 'react';
import { Col, Form, FormControl, Button } from 'react-bootstrap';
import './Item.css';

export default class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      valueItem: '',
      valueComment: ''
    };
  };

  addNewItems(e) {
    e.preventDefault();
    if (this.state.valueItem) {
      this.props.Items.push(this.state.valueItem);
      this.handleItemChange(e);
    }
  };

  addComments(e) {
    e.preventDefault();
    if (this.state.valueComment) {
      this.props.Comments.push(this.state.valueComment);
      this.handleCommentChange(e);
    }
  };

  handleCommentChange(e) {
    e.preventDefault();
    this.setState({
      valueComment: e.target.value
    });
  };

  handleItemChange(e) {
    e.preventDefault();
    this.setState({
      valueItem: e.target.value
    });
  };

  deleteItems(id, e) {
    this.props.Items.splice(id, 1);
    this.handleItemChange(e);
  };

  handleSetAttribute(id, list, e) {
    for (let i = 0; i < this.props.Items.length; i++) {
      if (i != id) {document.getElementById(i).setAttribute('style', 'border: none');
      }
    };
    document.getElementById(id).setAttribute('style', 'border-left: 2px solid red');
    this.props.Comments.splice(0, this.props.Comments.length);
    this.handleCommentChange(e);
    if (window.localStorage.getItem(list)) {
      for (let j = 0; j < window.localStorage.getItem(list).split(',').length; j++) {
        this.props.Comments.push((window.localStorage.getItem(list)).split(',')[j]);
      };
      this.handleCommentChange(e);
    }
    this.addComments(e);
    window.localStorage.setItem(list, this.props.Comments);
  };

  getItem(list) {
    return (window.localStorage.getItem(list) &&
      window.localStorage.getItem(list).split(',').length) ||
        0;
  };

  render() {
    return (
      <div className='Item'>
        <Col xs={6} sm={6} md={6}>
          <Form inline>
            <h2>Items</h2>
            <Col xs={8} sm={8} md={8}>
              <FormControl type='text' placeholder='Type name here...' onChange=
                {this.handleItemChange.bind(this)}/>
            </Col>
            <Col xs={4} sm={4} md={4}>
              <Button bsStyle='primary' onClick={this.addNewItems.bind(this)}>
                Add new
              </Button>
            </Col>
          </Form>
          {this.props.Items.map((list, id) => {
          return (
          <div key={id}>
            <Col xs={8} sm={8} md={8}>
              <div id={id} onClick={this.handleSetAttribute.bind(this, id, list)}>
                <div className='itemCount'>{list}</div>
                <div className='count'>{this.getItem(list)}</div>
              </div>
            </Col>
            <Col xs={4} sm={4} md={4}>
              <Button bsStyle='danger' onClick={this.deleteItems.bind(this, id)}>Delete</Button>
            </Col>
          </div>);
        })}
        </Col>
        <Col xs={6} sm={6} md={6}>
          <div className='Comment'>
            <h2>Comments</h2>
            <Form inline>
              {this.props.Comments.map((list, id) => {
                const array = ['square_orange', 'square_blue'];
                return (
                  <Col key={id} xs={12} sm={12} md={12}>
                    <Col xs={2} sm={2} md={2}>
                      <div className = {id % 2 == 0 ? array[0] : array[1]}>
                      </div>
                    </Col>
                    <Col xs={10} sm={10} md={10}>
                      <div>{list}</div>
                    </Col>
                  </Col>);
              })}
              <Col xs={2} sm={2} md={2}>
                <div className='square'>
                </div>
              </Col>
              <Col xs={10} sm={10} md={10}>
                <FormControl type='text' onChange={this.handleCommentChange.bind(this)} />
              </Col>
            </Form>
          </div>
        </Col>
      </div>
    );
  }
}
