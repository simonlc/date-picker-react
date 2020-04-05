import React, { cloneElement } from 'react';
import { useTooltip, TooltipPopup } from '@reach/tooltip';
import { useTransition, animated } from 'react-spring';
import './tooltip.css';

const TooltipContent = animated(TooltipPopup);

// TODO Get type for Rect
const centered = (triggerRect: any, tooltipRect: any) => {
  const triggerCenter = triggerRect.left + triggerRect.width / 2;
  const left = triggerCenter - tooltipRect.width / 2;
  const maxLeft = window.innerWidth - tooltipRect.width - 2;
  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: triggerRect.bottom + 8 + window.scrollY,
  };
};

export function Tooltip({ children, ...rest }: any) {
  const [trigger, tooltip, isVisible] = useTooltip();
  const transitions = useTransition(isVisible ? tooltip : false, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 500, friction: 40 },
  });
  return (
    <>
      {cloneElement(children, trigger)}
      {transitions.map(
        ({ item: tooltip, props: styles, key }) =>
          tooltip && (
            <TooltipContent
              key={key}
              {...tooltip}
              {...rest}
              style={styles}
              position={centered}
            />
          ),
      )}
    </>
  );
}
