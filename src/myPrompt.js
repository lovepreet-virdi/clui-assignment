import React, { useState, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import Downshift from 'downshift';
import PromptIcon from './PromptIcon';

import MatchSubString from './MatchSubString';
import useCluiInput from './useCluiInput';
import PropTypes from 'prop-types';
const MenuItem = props => {
  const { item, highlighted } = props;

  return (
    <div className={classnames('root', { highlighted })}>
      <div className="value">
        {item.searchValue ? (
          <MatchSubString source={item.value} match={item.searchValue} />
        ) : (
            item.value
          )}
      </div>
      {item.data && item.data.description ? (
        <div className="description">{item.data.description}</div>
      ) : null}

    </div>
  );
};

const Prompt = props => {

  const input = useRef > null;
  const ran = useRef(false);
  const [focused, setFocused] = useState(false);

  const [state, update] = useCluiInput({
    command: props.command,
    value: props.value || '',
    index: props.value ? props.value.length : 0
  });

  const onKeyUp = useCallback(e => update({ index: e.target.selectionStart }), [
    update
  ]);

  const run = useCallback(() => {
    if (!props.item || !state.run) {
      return;
    }

    ran.current = true;


    if (input.current) {
      input.current.blur();
    }

    props.item.insertAfter(state.run(), <Prompt {...props} autoRun={false} value="" />).next()
      ;

  }, [props.item, state.run]
  );

  useEffect(() => {

    if (ran.current) {
      return;
    }

    if (props.autoRun && state.run) {
      run();
    }
  }, [props.autoRun, state.run, run]);

  useEffect(() => {

    if (input.current && props.autoFocus) {
      const { value } = input.current;
      input.current.focus();
      input.current.selectionStart = value.length;
    }
  }, [props.autoFocus, input.current]);

  const isLastSession =
    props.item && props.item.index === props.item.session.currentIndex;

  return (
    <Downshift
      defaultHighlightedIndex={0}
      initialHighlightedIndex={0}
      inputValue={state.value}
      onChange={option => {
        if (!option) {
          return;
        }

        update({
          value: `${option.inputValue} `,
          index: option.cursorTarget + 1
        });
      }}
      itemToString={() => state.value}
    >
      {ds => {
        const inputProps = ds.getInputProps({
          autoFocus: true,
          spellCheck: false,
          autoComplete: 'off',
          placeholder: 'run a command',
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
          onKeyUp,
          onChange: ({ currentTarget }) => {

            update({
              value: currentTarget.value,
              index: currentTarget.selectionStart || 0
            });
          },
          onKeyDown: event => {
            if (event.key === 'Enter') {
              if (state.run) {
                run();
                return;
              }

              if (ds.highlightedIndex !== undefined) {
                ds.selectHighlightedItem();
              }
            }

            if (event.key === 'ArrowUp' && ds.highlightedIndex === 0) {
              // eslint-disable-next-line no-param-reassign
              event.nativeEvent.preventDownshiftDefault = true;
              event.preventDefault();
              ds.setState({ highlightedIndex: null });
            }
          }
        });

        return (
          <div
            className={classnames('prompt', {
              active: isLastSession || focused
            })}
          >
            <PromptIcon />
            <div className="input">
              {(isLastSession || focused) && state.run ? (
                <div className="input-shadow">
                  <span>{state.value}</span>
                  <button type="button" onClick={run}>
                    run ↵
                  </button>
                </div>
              ) : null}
              <input ref={input} {...inputProps} />
              {focused ? (
                <div className="menu-anchor">
                  <div className="menu">
                    <div className="menu-offset">
                      {state.value.slice(0, state.nodeStart || 0)}
                    </div>
                    <ul {...ds.getMenuProps()}>
                      {state.options.map((item, index) => (
                        <li
                          {...ds.getItemProps({ item })}
                          key={item.value}
                          className={classnames('item', {
                            active: ds.highlightedIndex === index
                          })}
                        >
                          <MenuItem
                            item={item}
                            highlighted={ds.highlightedIndex === index}
                            theme={props.theme}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
};

Prompt.propTypes = {
  command: PropTypes.shape({
    commands: PropTypes.shape({
      customCommand: PropTypes.shape({
        commands: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
}
export default Prompt;
