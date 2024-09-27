import { useRef, useEffect } from "react";

const CustomPopover = ({ content, className, children, isOpen, setIsOpen }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={popoverRef} className={className}>
      <div onClick={handleTriggerClick} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div className="absolute bg-white border rounded shadow-lg p-4 mt-2 top-14 right-4">
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomPopover;
