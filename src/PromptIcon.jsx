import React from 'react';
import classnames from 'classnames';

const Icon = {
  ERROR: '!',
  CHECKMARK: '✔',
  CARET: '❯'
};

const PromptIcon = props => (
  <div className={classnames('icon', props)}>
    <span>{Icon[props.icon || 'CARET']} </span>
  </div>
);

export default PromptIcon;
