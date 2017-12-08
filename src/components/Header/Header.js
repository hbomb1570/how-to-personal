// import React from 'react';
// import IconMenu from 'material-ui/IconMenu';
// import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
// import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

// export default class Header extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 3,
//     };
//   }

//   handleChange = (event, index, value) => this.setState({value});

//   render() {
//     return (
//       <Toolbar>
//         <ToolbarGroup firstChild={true}>
//         </ToolbarGroup>
//         <ToolbarGroup>
//           <ToolbarTitle text="Options" />
//           <FontIcon className="muidocs-icon-custom-sort" />
//           <ToolbarSeparator />
//           <RaisedButton label="" primary={true} />
//           <IconMenu
//             iconButtonElement={
//               <IconButton touch={true}>
//                 <NavigationExpandMoreIcon />
//               </IconButton>
//             }
//           >
            
//           </IconMenu>
//         </ToolbarGroup>
//       </Toolbar>
//     );
//   }
// }