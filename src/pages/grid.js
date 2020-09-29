import React from 'react';
import {Router as MyRouter, Redirect} from '@reach/router';
import GridTool from '../components/gridTool';

const Router = () => {
  return (
    <MyRouter>
      <GridTool path="grid/" />
    </MyRouter>
  )
}

export default Router;
