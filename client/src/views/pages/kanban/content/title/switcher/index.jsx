import React, { useState } from 'react'
import styled from 'styled-components'
import { IconLayoutKanban, IconTable} from '@tabler/icons-react'

const Wrapper = styled.div`
  display: flex;
  margin-left: 20px;
  @media (max-width: 450px) {
    display: none;
  }
`
const Icon = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
  svg {
    fill: #b5b5be;
  }
`
const Kanban = styled(Icon)`
  border-radius: 10px 0 0 10px;
  background-color: ${(props) => (props.type ? '#b5b5be' : '#fff')};
  svg {
    fill: ${(props) => (props.type ? '#fff' : '#b5b5be')};
  }
`
const Default = styled(Icon)`
  border-radius: 0px 10px 10px 0px;
  border-right: 1px solid #f1f1f5;
  border-left: 1px solid #f1f1f5;
  background-color: ${(props) => (props.type ? '#b5b5be' : '#fff')};
  svg {
    fill: ${(props) => (props.type ? '#fff' : '#b5b5be')};
  }
`

const Gantt = styled(Icon)`
  border-radius: 0 10px 10px 0;
  cursor: not-allowed;
`

const Switcher = () => {

    const [typeKanban, setTypeKanban] = useState(true)
    const [typeDefault, setTypeDefault] = useState(false)

    const handleTypeKanban = () => {
        setTypeKanban(true)
        setTypeDefault(false)
    }

    const handleTypeDefault = () => {
        setTypeDefault(true)
        setTypeKanban(false)
    }
  return (
    <>
        <Wrapper>
        <Kanban type={typeKanban ? 1 : 0} onClick={handleTypeKanban}>
            <IconLayoutKanban />
        </Kanban>
        <Default type={typeDefault ? 1 : 0} onClick={handleTypeDefault}>
            <IconTable />
        </Default>
        </Wrapper>
    </>
  )
}

export default Switcher