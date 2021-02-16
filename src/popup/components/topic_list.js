import React, { Fragment } from "react";
import styled from "styled-components";

const Ul = styled.ul`
  list-style-type: none;
  margin-left: 40px;
`;

export const CheckList = ({ items, checkedHandler }) => {
  console.log("render checklist");
  return (
    <Fragment>
      <Ul>
        {Object.keys(items).map((i) => {
          return (
            <div key={i}>
              <label htmlFor={`selectItem${i}`} key={i}>
                {i}
              </label>
              <input
                type="checkbox"
                id={`selectItem${i}`}
                onClick={() => checkedHandler(i)}
                value={items[i]}
              />
              <span>{i}</span>
            </div>
          );
        })}
      </Ul>
    </Fragment>
  );
};
