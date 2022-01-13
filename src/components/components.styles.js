import styled from "styled-components";

export const Wrapper = styled.div`
  padding: var(--wrapper-lg-side-padding);
  padding-top: var(--wrapper-lg-top-padding);

  @media (max-width: 40rem) {
    padding-left: 3rem;
  }
`;
