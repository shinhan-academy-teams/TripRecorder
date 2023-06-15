import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, theme } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { useEffect, useRef, useState } from "react";

const HashTag = () => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]); //태그 배열
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    //console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
      console.log([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag) => {
    // 태그내용(입력 내용))
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: "inline-block",
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: "from",
            duration: 100,
          }}
          onEnd={(e) => {
            if (e.type === "appear" || e.type === "enter") {
              e.target.style = "display: inline-block";
            }
          }}
          leave={{
            opacity: 0,
            width: 0,
            scale: 0,
            duration: 200,
          }}
          appear={false}
        >
          태그 : {tagChild}
        </TweenOneGroup>
      </div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            width: 100,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
          <PlusOutlined /> HashTag
        </Tag>
      )}
    </>
  );
};

export default HashTag;