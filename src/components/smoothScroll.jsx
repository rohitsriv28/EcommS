import { Link, useLocation } from "react-router-dom";

const scrollToSection = (id, offset = 0) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const GoTo = ({ to, id, offset = 0, children, ...props }) => {
  const { pathname } = useLocation();
  if (pathname === "/") {
    return (
      <div
        onClick={() => scrollToSection(id, offset)}
        className=" cursor-pointer"
        {...props}
      >
        {children}
      </div>
    );
  } else {
    return (
      <Link to={to} className=" cursor-pointer" {...props}>
        {children}
      </Link>
    );
  }
};
