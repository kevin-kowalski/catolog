import { useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import useClickOutside from './useClickOutside';
import { IPopoverPicker } from './WeeTypes';

export const PopoverPicker = ({ currentObjectColor, onChange }: IPopoverPicker) => {

  // Constants
  const popover = useRef<HTMLDivElement>(null);

  // State variable
  const [isOpen, setIsOpen] = useState(false);

  // When the user clicks outside of the color
  // picker, close it
  useClickOutside(popover, () => setIsOpen(false));

  /**
   * Render component
   */

  return (<>
    <div className="picker">
      <div
        className="swatch"
        style={{ backgroundColor: currentObjectColor }}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={currentObjectColor} onChange={onChange} />
        </div>
      )}
    </div>
  </>);
};
