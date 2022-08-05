import React from 'react';
import styled from "styled-components";

const StyledSquare = styled.button`
  background-color: ${active => active ? '#fff' : '#fafafa'};
  border: ${active => active ? '3px solid #222' : '3px solid #dadada'};
  float: left;
  font-size: 50px;
  font-weight: bold;
  line-height: 100px;
  height: 100px;
  margin-right: -3px;
  margin-top: -3px;
  padding: 0;
  text-align: center;
  width: 100px;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    line-height: 90px;
    font-size: 45px;
  }
  @media (max-width: 320px) {
    width: 70px;
    height: 70px;
    line-height: 70px;
    font-size: 35px;
  }
`;

function Square({onClick, value, active}) {
  return (
    <StyledSquare type="button" onClick={onClick}>
      {value}
    </StyledSquare>
  );
}

export default Square;
