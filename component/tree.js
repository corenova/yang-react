import Yang from 'yang-js'
import React from 'react'
import YangReact from '..'
import TreeNodeSchema from './tree-node.yang'
import TreeLeafSchema from './tree-leaf.yang'

const TreeLeaf = TreeLeafSchema({

  toggleEdit(e) {
	if (this.props.editable) {
	  this.setState({ editing: !this.state.editing })
	}
  },

  onChange(e) {
	this.setState({ value: e.target.value })
  },

  renderData(value) {
	if (this.state.editing) {
	  return (
		<input 
		  className='form-control'
		  value={this.state.value}
		  onChange={this.onChange}
        />
	  )
	} else {
	  return value
	}
  },

  render() {
	const { key, value } = this.props
	
	return (
      <div className='form-horizontal row'>
	    <label className='control-label col-sm-3'>{key}:</label>
	    <span className='col-sm-9' onClick={this.toggleEdit}>
	    {this.renderData(value)}
        </span>
      </div>
    )
  }

})

const TreeNode = TreeNodeSchema({

  toggle(e) {
    if (this.props.collapsible) {
      this.setState({ collapsed: !this.state.collapsed })
    }
  },

  renderChild(key, value) {
    let { collapsible, editable, level } = this.props
    let type = typeof value == 'object' ? 'tree-node' : 'tree-leaf'
	let selection;
	switch (type) {
      case 'tree-node': 
        selection = (
		  <TreeNode 
            key={key} 
            value={value} 
            collapsible={collapsible}
            editable={editable}
            level={level ? --level : 0}
          />
		)
	    break
      case 'tree-leaf':
	    selection = (
          <TreeLeaf
            key={key} 
            value={value} 
            editable={editable}
		  />
	    )
	    break
	}
    return (
      <li key={key} className={type}>
        {selection}
      </li>
    )
  },

  render() {
	const { key, value } = this.props
	let icon = this.state.collapsed ? 'plus' : 'minus'
    let keys = typeof value == 'object' ? Object.keys(value) : []
    return (
      <div>
		<a className='nav-header' onClick={this.toggle}>
		  <span className={`glyphicon glyphicon-${icon}`}/>
		  {' '}
		  {key}
		</a>
		<ul className='nav nav-list'>
		  { this.state.collapsed ? '...' : 
			keys.map(x => this.renderChild(x, value[x]))
		  }
	    </ul>
      </div>
    )
  }
})

export { TreeNode, TreeLeaf }
export default TreeNode
