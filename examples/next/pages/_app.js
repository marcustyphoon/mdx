import React from 'react'

const components = {
  h1: props => <h1 style={{color: 'tomato'}} {...props} />
}

const Page = ({Component}) => <Component components={components} />

export default Page
