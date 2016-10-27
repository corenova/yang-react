import Yang from 'yang-js'
import YangReact from '..'
import TreeNodeSchema from './tree.yang'

TreeNodeSchema.bind({
  constructor(props) {
    
  },

  toggle() {
    this.setState({
	  collapsed: !this.state.collapsed
	});
  },

  render() {
	let value = this.props.value
	if (!(value instanceof Object)) {
      return (
        <li className='tree-leaf'>
        </li>
      )
	}
    let nodes = []
    for (const key in value) {
      nodes.push (<TreeNode key={key} value={value[key]}/>)
    }
    return (
      <ul>
		{nodes}
      </ul>
    )
  }
})

export default TreeNodeSchema()
