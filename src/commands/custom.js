import React, { useEffect, useState } from 'react';
import data from '../data';

const CustomComp = (props) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(count + 1)
  }, [])
  useEffect(() => {
    if (count) {
      // After data has loaded, call `next` to show next child (which is another Prompt)
      props.item.next();
    }
  }, [count]);
  return props.ui || 'No ui was provided'
}
const generateCommands = (array) => {
  return array.reduce((cur, nex) => {

    cur[nex.command] = {
      description: nex.description,

    }
    if (nex.child && nex.child.length) {
      cur[nex.command].commands = () => {
        return generateCommands(nex.child)
      }
    } else {
      cur[nex.command].run = () => { return <CustomComp ui={nex.ui}/> }
    }
    return cur;
  }, {});
}
export default {

  commands: () => {
    return generateCommands(data)
  }


};
