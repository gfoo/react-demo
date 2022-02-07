import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { substring } from "../../lib/helpers";

const LimitedParagraph = ({
  paragraph = "",
  limitSize = null,
  prefix = null,
  prefixLinefeed = false,
  showTooltip = true,
}) => {
  const content = (
    <p>
      {prefix ? prefix : ""}
      {prefixLinefeed ? <br /> : ""}
      {substring(paragraph, limitSize)}
    </p>
  );

  return (
    <>
      {showTooltip && (
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={
            <Tooltip
              disabled={showTooltip}
              id={"LimitedParagraph-tooltip" + paragraph}
            >
              {paragraph}
            </Tooltip>
          }
        >
          {content}
        </OverlayTrigger>
      )}
      {!showTooltip && <>{content}</>}
    </>
  );
};

export default LimitedParagraph;
