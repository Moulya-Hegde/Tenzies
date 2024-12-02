import styled from "styled-components";
const Number = (props) => {
  return <Face onClick={props.onClick} isFrozen={props.isFrozen}>{props.number}</Face>;
};
const Face = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.isFrozen?'green':'whitesmoke'};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: "Knewave", system-ui;
  font-weight: 400;
  font-style: normal;
  font-size: 29px;
  border-radius: 15%;
  cursor: pointer;
`;

export default Number;
