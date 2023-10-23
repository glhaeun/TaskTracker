import styled from "styled-components";

export const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000; /* Adjust the z-index as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4); /* Semi-transparent background */ /* Apply backdrop filter for blur effect */
`;


export const DeleteBox = styled.div`
  width: 35px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.5);
    transition: 250ms transform ease-in-out, 200ms color ease-in-out;
    &:hover {
      transform: scale(1.15);
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;
