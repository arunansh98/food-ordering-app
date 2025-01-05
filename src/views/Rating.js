import { FaStar } from "react-icons/fa";

export default function Rating(props) {
  const { rating } = props;
  const decimal = rating - parseInt(rating);
  return (
    <div className="flex flex-row items-center">
      {Array(5)
        .fill(0)
        .map((_item, index) => {
          if (index + 1 <= rating) {
            return <FaStar style={{ color: "yellow", marginRight: "1rem" }} />;
          }
          if (index === parseInt(rating)) {
            const percentage = decimal * 100;
            return (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginRight: "1rem",
                }}
              >
                {/* Full Gray Star (Base) */}
                <FaStar style={{ color: "lightgray" }} />

                {/* Partial Yellow Star (Overlay) */}
                <FaStar
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    color: "yellow",
                    clipPath: `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`, // Masking effect
                  }}
                />
              </div>
            );
          }
          return <FaStar style={{ color: "grey", marginRight: "1rem" }} />;
        })}
    </div>
  );
}
