import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ActionReorder from 'material-ui/svg-icons/action/reorder'
import { Link } from 'react-router-dom'
import './MenuBar.css'



export default class MenuBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <RaisedButton className="menuButton"
          icon={<ActionReorder />}
          onClick={this.handleToggle}
        />
        <Drawer className='menuDrawer'
          docked={false}
          width={150}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <Link to='/' style={{ color: 'white' }}><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
          <Link to='/search' style={{ color: 'white' }}><MenuItem onClick={this.handleClose}>Search</MenuItem></Link>
          <Link to='/techniques' style={{ color: 'white' }}><MenuItem onClick={this.handleClose}>Techniques</MenuItem></Link>
          <Link to='/videos' style={{ color: 'white' }}><MenuItem onClick={this.handleClose}>Videos</MenuItem></Link>
          <Link to='/pantry' style={{ color: 'white' }}><MenuItem onClick={this.handleClose}>Pantry</MenuItem></Link>
           <Link to='/favorites' style={{color:'white'}}><MenuItem onClick={this.handleClose}>Favorites</MenuItem></Link>
          {/* <Link to='/logout' style={{color:'white'}}><MenuItem onClick={this.handleClose}>Logout</MenuItem></Link> */}
        </Drawer>
      </div>
    );
  }
}