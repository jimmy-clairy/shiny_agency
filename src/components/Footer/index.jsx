import { useContext } from 'react'
import { ThemeContext } from '../../utils/context'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

const FooterContainer = styled.footer`
  display: flex;
  flex-diection: row;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
`

const NightModeButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  color: ${({ theme }) => (theme === 'light' ? colors.secondary : 'white')};
`

function Footer() {
  const { toggleTheme, theme } = useContext(ThemeContext)
  return (
    <FooterContainer>
      <NightModeButton onClick={() => toggleTheme()} theme={theme}>
        Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
      </NightModeButton>
    </FooterContainer>
  )
}

export default Footer
