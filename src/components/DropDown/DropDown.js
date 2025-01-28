import { useEffect, useRef, useState } from "react";
import "./DropDown.css";
import { IoIosArrowDown } from "react-icons/io";

export default function DropDown(props) {
  const { options, activeOption, onChange } = props;

  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownRef = useRef();

  let arrowClass = "inline float-right";

  if (showDropDown) {
    arrowClass = arrowClass + " rotate";
  }

  useEffect(() => {
    const handleClick = (event) => {
      let dropdownEl = dropDownRef?.current;
      if (!dropdownEl) {
        return;
      }
      if (!dropdownEl.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="w-[10vw] z-[1000]" ref={dropDownRef}>
      <div className="trigger" onClick={() => setShowDropDown((prev) => !prev)}>
        <span>
          {activeOption === undefined && "Select Sort By"}
          {activeOption !== undefined &&
            options.find((_item, index) => index === activeOption).value}
        </span>
        <span>
          <IoIosArrowDown className={arrowClass} />
        </span>
      </div>
      {showDropDown && (
        <div className="dropdown">
          <div className="dropdown-parent">
            {options.map((item, index) => (
              <h1
                className="option"
                onClick={() => {
                  setShowDropDown(false);
                  onChange(index);
                }}
              >
                {item.value}
              </h1>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
