import TreeNode from './tree'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

const Renderer = ReactTestUtils.createRenderer()

const obj = {
  hello: {
	world: 'bye'
  }
}
Renderer.render(
  <TreeNode key='test' value={obj}>some random text</TreeNode>
)

export default Renderer.getRenderOutput()
