//styles
import { Container, StyledNav } from "./styles";
//icon
//redux
import { useDispatch } from "react-redux";
import { toggleCreateNoteModal } from "../../../../../../redux/featuresNotes";

import { IconPlus } from "@tabler/icons-react";
import { startTransition } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { CreateNoteModal } from "../../../../../../component";
import { ButtonFill } from "../../../style";


const TitleQuickNotes = () => {
  const dispatch = useDispatch();

  //getting path
  const location = useLocation();
  const { pathname, state } = location;

  const { viewCreateNoteModal } = useSelector((state) => state.modal);


  //not displaying navbar in the following path
  if (pathname === "/" || pathname === "/404") {
    return;
  }
 
  const handleClick = () => {
    startTransition(() => {
      dispatch(toggleCreateNoteModal(true));
    });
  };


  return (
    <StyledNav>
      <Container>
      {viewCreateNoteModal && <CreateNoteModal />}
        {state !== "Trash" && state !== "Archive" && (
          <ButtonFill
            onClick={handleClick}
            className="nav__btn"
            style={{
              display:"flex",
              alignItems:"center"
            }}
          >
            <IconPlus /><span>Create</span>
          </ButtonFill>
        )}
      </Container>
    </StyledNav>
  );
};

export default TitleQuickNotes
