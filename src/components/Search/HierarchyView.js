import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../../redux/actions.js'
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import {blue500, grey900,grey700, grey500, grey300, blue200, blue400, grey200, green500, grey100} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SortableTree, {toggleExpandedForAll} from 'react-sortable-tree';
import Add from 'material-ui/svg-icons/content/add';

function toTreeData(tree) {
  return Object.keys(tree).map(function (title) {
    var actualTitle = title;
    var concept_cd = '';
    if(title.includes('@')){
      actualTitle = title.substr(0, title.indexOf('@'));
      concept_cd = title.split('@')[1];
    }
    var o = { title: actualTitle, concept_cd: concept_cd };
    if (Object.keys(tree[title]).length > 0) {
      o.children = toTreeData(tree[title]);
    }
    return o;
  });
}

function prefix(arr1){
  var arr= arr1.concat().sort(),
  a1= arr[0], a2= arr[arr.length-1], L= a1.length, i= 0;
  while(i< L && a1.charAt(i)=== a2.charAt(i)) i++;
  return a1.substring(0, i);
}

class HierarchyView extends Component {
    constructor(props){
        super(props);

        this.state = {
            treeData: null,
            searchString: '',
            searchFocusIndex: 0,
            searchFoundCount: null,
            addOpen: false,
            expanded: false,
            expandLabel: 'Expand'
        }
    }

    

    componentDidMount () {
        var filePathsArray = this.props.treeData.map(function(path) {
            var editedPath = path.c_fullname.replace(/\\/g, '/').slice(0,-1);
            editedPath = editedPath.substring(0, editedPath.lastIndexOf('/')) + '/' + path.c_name;
            editedPath = editedPath.replace(/\([0-9]\)/g, '');
            editedPath += ' – ' + path.patient_num + ' patients' + '@' + path.c_basecode;
            return editedPath;
        });
         
        const commonFilePath = prefix(filePathsArray);
        var tree = {};
        filePathsArray.forEach(function (path) {
            var path = path.replace(commonFilePath, "");
            var currentNode = tree;
            path.split('/').forEach(function (segment) {
                if (currentNode[segment] === undefined) {
                    currentNode[segment] = {};
                }
                currentNode = currentNode[segment];
            });
        });

        var treeData = toTreeData(tree);
        this.setState({
            treeData: treeData
        })

        this.searchTermFunc();
        
    }

    expand = () => {
      var label = "Collapse";
      if(this.state.expanded){
        label = 'Expand';
      }
      this.setState({
        treeData: toggleExpandedForAll({
          treeData: this.state.treeData,
          expanded: !this.state.expanded,
          expandLabel: label
        }),
        expanded: !this.state.expanded,
        expandLabel: label
      });
    }

    handleAdd = (concept) => {
      this.setState({
        addOpen: !this.state.addOpen,
        conceptName: concept
      })
    }

    searchTermFunc = () => {
        var that = this;
        setTimeout(function() {
            that.setState({
                searchString: that.props.searchTerm
            })
        }, 10);
    }

    render() {
      var that = this;
      const {
        treeData,
        searchString,
        searchFocusIndex,
        searchFoundCount,
      } = this.state;


      const selectPrevMatch = () =>
        this.setState({
            searchFocusIndex: searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
            });

       const selectNextMatch = () =>
        this.setState({
            searchFocusIndex: searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
        });

        const alertNodeInfo = ({ node, path, treeIndex }) => {
            return node.title; 
        };
      
      var height = 500;
      return (
        <div style={{overflow: 'hidden'}} >

            <Paper style={{display: 'flex', width: '100%', overflowX: 'hidden', overflowY: 'hidden', paddingBottom: 6, paddingTop: 6}} zDepth={0}>
                  <div style={{width: '85%', display: 'inline-flex',lineHeight: 1.4, paddingLeft: 24, alignItems: 'center', fontWeight: 600}}>
                      Search Results Hierarchy
                      <Paper zDepth={0} style={{marginLeft: 'auto', marginRight: 'auto', backgroundColor: grey200, borderRadius: 4, padding: 4, height: 36, display: 'flex', alignItems: 'center'}}>
                        <TextField
                        hintText="Search term"
                        hintStyle={{fontWeight: 400, color: grey700}}
                        inputStyle={{fontWeight: 400, color: grey900}}
                        value={this.state.searchString}
                        onChange={event =>
                          this.setState({ searchString: event.target.value })}
                        style={{marginLeft: 'auto', marginRight: 'auto', color: grey900, paddingLeft: 15, paddingRight: 15}}
                        underlineStyle={{display: 'none'}}
                        />
                      </Paper>
                      
                  </div>
                  <div style={{display: 'inline-flex', alignItems: 'center',  justifyContent: 'flex-end'}}>
                        
                        <FlatButton label={this.state.expandLabel} onTouchTap={this.expand} style={{marginRight: 20}}/>
                        
                  </div>
              </Paper>

            <Divider style={{marginBottom: 5}}/>
          
          <div style={{height: height}}>
            <div style={{overflow: 'auto', height: height}}>
            <SortableTree 
          treeData={treeData}
          onChange={treeData => this.setState({ treeData })}
          canDrag={false}
          rowHeight={28}
          style={{fontFamily: 'Roboto', fontSize: 12, fontWeight: 400, paddingLeft: 16}}
          isVirtualized={true}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          searchFinishCallback={matches =>
                this.setState({
                  searchFoundCount: matches.length,
                  searchFocusIndex: matches.length > 0
                    ? searchFocusIndex % matches.length
                    : 0,
                })}
          generateNodeProps={function (rowInfo) {
            if(rowInfo.node.concept_cd !== ''){
              return {
                buttons: [
                    <IconButton
                    style={{
                        verticalAlign: 'middle',
                        border: 0,
                        background: 'none',
                        boxShadow: 'none',
                        borderRadius: 0,
                        fontSize: 16,
                        cursor: 'pointer',
                        color: green500,
                    }}
                    onTouchTap={() => that.handleAdd(alertNodeInfo(rowInfo))}
                    tooltip="Add To Group"
                    >
                        <Add color={green500}/>
                    </IconButton>
                    ,
                ],
              }
            }
          }}
          />

            </div>
          </div>
          
        </div>
      );
  }
}

export default connect((state) => {
  return {
    treeData: state.treeData
  }
})(HierarchyView);